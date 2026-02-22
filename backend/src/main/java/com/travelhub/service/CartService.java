package com.travelhub.service;

import com.travelhub.Dtos.AddToCartRequest;
import com.travelhub.Dtos.CartResponseDTO;
import com.travelhub.entity.Cart;
import com.travelhub.entity.CartItem;
import com.travelhub.entity.User;
import com.travelhub.repository.CartItemRepository;
import com.travelhub.repository.CartRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

import static sun.awt.image.MultiResolutionCachedImage.map;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;

    private final FlightService flightService;
    private final VehicleService vehicleService;
    private final DestinationService destinationService;

    // ---------------- ADD ----------------

    @Transactional
    public CartResponseDTO addToCart(User user, AddToCartRequest request) {

        Cart cart = getOrCreateCart(user);

        BigDecimal latestPrice = fetchLatestPrice(request);

        CartItem item = new CartItem();
        item.setCart(cart);
        item.setReferenceId(request.getReferenceId());
        item.setServiceType(request.getServiceType());
        item.setQuantity(request.getQuantity());
        item.setUnitPrice(latestPrice);
        item.setStartDate(request.getStartDate());
        item.setEndDate(request.getEndDate());
        item.setTravelDate(request.getTravelDate());

        item.recalculateSubtotal();

        cart.getItems().add(item);
        cart.calculateTotal();

        cartRepository.save(cart);

        return map(cart);
    }

    // ---------------- REMOVE ----------------

    @Transactional
    public void removeItem(User user, Long itemId) {

        Cart cart = getActiveCart(user);

        CartItem item = cart.getItems()
                .stream()
                .filter(i -> i.getId().equals(itemId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Item not found"));

        cart.getItems().remove(item);

        cart.calculateTotal();

        cartRepository.save(cart);
    }

    // ---------------- VIEW (RECALCULATE LIVE) ----------------

    @Transactional
    public CartResponseDTO viewCart(User user) {

        Cart cart = getActiveCart(user);

        // Recalculate prices live
        for (CartItem item : cart.getItems()) {
            BigDecimal latest = fetchLatestPriceFromItem(item);
            item.setUnitPrice(latest);
            item.recalculateSubtotal();
        }

        cart.calculateTotal();
        cartRepository.save(cart);

        return map(cart);
    }

    // ---------------- CHECKOUT ----------------

    @Transactional
    public CheckoutResponseDTO checkout(User user) {

        Cart cart = getActiveCart(user);

        if (cart.getExpiresAt().isBefore(LocalDateTime.now())) {
            cart.setStatus(CartStatus.EXPIRED);
            cartRepository.save(cart);
            throw new RuntimeException("Cart expired");
        }

        // Final recalculation before booking
        viewCart(user);

        cart.getItems().forEach(item -> {
            switch (item.getServiceType()) {
                case FLIGHT -> flightService.createBookingFromCart(user, item);
                case VEHICLE -> vehicleService.createBookingFromCart(user, item);
                case DESTINATION -> destinationService.createBookingFromCart(user, item);
            }
        });

        cart.setStatus(CartStatus.CHECKED_OUT);
        cartRepository.save(cart);

        // Payment initiation layer
        String paymentUrl = "https://payment-gateway/tx/" + cart.getId();

        return new CheckoutResponseDTO(paymentUrl);
    }

    // ---------------- HELPERS ----------------

    private Cart getOrCreateCart(User user) {
        return cartRepository.findByUserAndStatus(user, CartStatus.ACTIVE)
                .orElseGet(() -> {
                    Cart c = new Cart();
                    c.setUser(user);
                    c.setExpiresAt(LocalDateTime.now().plusMinutes(30));
                    return cartRepository.save(c);
                });
    }

    private Cart getActiveCart(User user) {
        return cartRepository.findByUserAndStatus(user, CartStatus.ACTIVE)
                .orElseThrow(() -> new RuntimeException("No active cart"));
    }

    private BigDecimal fetchLatestPrice(AddToCartRequest request) {
        return switch (request.getServiceType()) {
            case FLIGHT -> flightService.getPriceForCart(request);
            case VEHICLE -> vehicleService.getPriceForCart(request);
            case DESTINATION -> destinationService.getPriceForCart(request);
        };
    }

    private BigDecimal fetchLatestPriceFromItem(CartItem item) {
        return switch (item.getServiceType()) {
            case FLIGHT -> flightService.getPriceById(item.getReferenceId(), item.getQuantity(), item.getTravelDate());
            case VEHICLE -> vehicleService.getPriceById(item.getReferenceId(), item.getStartDate(), item.getEndDate());
            case DESTINATION -> destinationService.getPriceById(item.getReferenceId(), item.getQuantity(), item.getTravelDate());
        };
    }
}