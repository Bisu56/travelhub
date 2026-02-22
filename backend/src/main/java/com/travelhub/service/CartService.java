package com.travelhub.service;

import com.travelhub.Dtos.*;
import com.travelhub.entity.Cart;
import com.travelhub.entity.CartItem;
import com.travelhub.entity.User;
import com.travelhub.entity.enums.CartStatus;
import com.travelhub.entity.enums.ServiceType;
import com.travelhub.repository.CartItemRepository;
import com.travelhub.repository.CartRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;

    private final FlightService flightService;
    private final VehicleService vehicleService;
    private final DestinationService destinationService;

    // =========================================================
    // ADD TO CART
    // =========================================================
    @Transactional
    public CartResponseDTO addToCart(User user, AddToCartRequest request) {

        validateRequest(request);

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
        cart.recalculateTotal();

        cartRepository.save(cart);

        return mapToDTO(cart);
    }

    // =========================================================
    // REMOVE ITEM
    // =========================================================
    @Transactional
    public void removeItem(User user, Long itemId) {
        Cart cart = getActiveCart(user);

        CartItem item = cart.getItems()
                .stream()
                .filter(i -> i.getId().equals(itemId))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Cart item not found"));

        cart.getItems().remove(item);
        cart.recalculateTotal();
        cartRepository.save(cart);
    }

    // =========================================================
    // VIEW CART (LIVE RECALCULATION)
    // =========================================================
    @Transactional
    public CartResponseDTO viewCart(User user) {
        Cart cart = getActiveCart(user);

        for (CartItem item : cart.getItems()) {
            BigDecimal latestPrice = fetchLatestPriceFromItem(item);
            item.setUnitPrice(latestPrice);
            item.recalculateSubtotal();
        }

        cart.recalculateTotal();
        cartRepository.save(cart);

        return mapToDTO(cart);
    }

    // =========================================================
    // CHECKOUT & PAYMENT FLOW
    // =========================================================
    @Transactional
    public CheckoutResponseDTO checkout(User user) {

        Cart cart = getActiveCart(user);

        if (cart.getExpiresAt().isBefore(LocalDateTime.now())) {
            cart.setStatus(CartStatus.EXPIRED);
            cartRepository.save(cart);
            throw new IllegalStateException("Cart expired");
        }

        if (cart.getItems().isEmpty()) {
            throw new IllegalStateException("Cart is empty");
        }

        // Final recalculation before booking
        viewCart(user);

        // Book services from the cart items
        for (CartItem item : cart.getItems()) {
            switch (item.getServiceType()) {
                case FLIGHT -> flightService.createBookingFromCart(user, item);
                case VEHICLE -> vehicleService.createBookingFromCart(user, item);
                case DESTINATION -> destinationService.createBookingFromCart(user, item);
                default -> throw new IllegalStateException("Unsupported service type");
            }
        }

        cart.setStatus(CartStatus.CHECKED_OUT);
        cartRepository.save(cart);

        // Generate payment URL
        String paymentUrl = generatePaymentUrl(cart);

        return new CheckoutResponseDTO(paymentUrl);
    }

    // =========================================================
    // PAYMENT PROCESS
    // =========================================================
    public String processPayment(String paymentUrl) {
        // Payment gateway logic here (simulated)
        updateBookingStatuses(paymentUrl);
        return "Payment successful, booking confirmed.";
    }

    private void updateBookingStatuses(String paymentUrl) {
        // After payment success, update all bookings in the cart to PAID
        // Could also be triggered via webhook
    }

    // =========================================================
    // HELPERS
    // =========================================================
    private Cart getOrCreateCart(User user) {
        return cartRepository.findByUserAndStatus(user, CartStatus.ACTIVE)
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setUser(user);
                    newCart.setStatus(CartStatus.ACTIVE);
                    newCart.setExpiresAt(LocalDateTime.now().plusMinutes(30));
                    newCart.setItems(new ArrayList<>());
                    return cartRepository.save(newCart);
                });
    }

    private Cart getActiveCart(User user) {
        return cartRepository.findByUserAndStatus(user, CartStatus.ACTIVE)
                .orElseThrow(() -> new IllegalStateException("No active cart found"));
    }

    private void validateRequest(AddToCartRequest request) {
        if (request.getServiceType() == ServiceType.VEHICLE) {
            if (request.getStartDate() == null || request.getEndDate() == null)
                throw new IllegalArgumentException("Vehicle booking requires start and end date");
        }
        if (request.getServiceType() == ServiceType.FLIGHT ||
                request.getServiceType() == ServiceType.DESTINATION) {
            if (request.getTravelDate() == null)
                throw new IllegalArgumentException("Travel date is required");
        }
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
            case FLIGHT -> flightService.getPriceById(
                    item.getReferenceId(),
                    item.getQuantity(),
                    item.getTravelDate(),
                    item.getFlightClass() // pass flight class if needed
            );
            case VEHICLE -> vehicleService.getPriceById(
                    item.getReferenceId(),
                    item.getStartDate(),
                    item.getEndDate(),
                    item.getQuantity(),   // number of seats if partial booking
                    item.getFullVehicle() // flag for full vehicle booking
            );
            case DESTINATION -> destinationService.getPriceById(
                    item.getReferenceId(),
                    item.getQuantity(),
                    item.getTravelDate()
            );
        };
    }

    private String generatePaymentUrl(Cart cart) {
        return "https://payment.travelhub.com/checkout/" + cart.getId();
    }

    private CartResponseDTO mapToDTO(Cart cart) {
        List<CartItemResponseDTO> items = cart.getItems().stream()
                .map(item -> CartItemResponseDTO.builder()
                        .itemId(item.getId())
                        .referenceId(item.getReferenceId())
                        .serviceType(item.getServiceType().name())
                        .quantity(item.getQuantity())
                        .unitPrice(item.getUnitPrice())
                        .subtotal(item.getSubtotal())
                        .startDate(item.getStartDate())
                        .endDate(item.getEndDate())
                        .travelDate(item.getTravelDate())
                        .build())
                .toList();

        return CartResponseDTO.builder()
                .cartId(cart.getId())
                .status(cart.getStatus().name())
                .totalAmount(cart.getTotalAmount())
                .expiresAt(cart.getExpiresAt())
                .createdAt(cart.getCreatedAt())
                .items(items)
                .build();
    }
}