package com.travelhub.controller;

import com.travelhub.Dtos.AddToCartRequest;
import com.travelhub.Dtos.CartResponseDTO;
import com.travelhub.entity.User;
import com.travelhub.service.CartService;
import com.travelhub.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user/cart")
@RequiredArgsConstructor
@PreAuthorize("hasRole('USER')")
public class CartController {

    private final CartService cartService;
    private final UserService userService;

    @PostMapping("/items")
    public ResponseEntity<CartResponseDTO> add(
            @Valid @RequestBody AddToCartRequest request,
            Authentication auth) {

        User user = userService.getCurrentUser(auth);
        return ResponseEntity.ok(cartService.addToCart(user, request));
    }

    @DeleteMapping("/items/{itemId}")
    public ResponseEntity<Void> remove(
            @PathVariable Long itemId,
            Authentication auth) {

        User user = userService.getCurrentUser(auth);
        cartService.removeItem(user, itemId);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<CartResponseDTO> view(Authentication auth) {
        User user = userService.getCurrentUser(auth);
        return ResponseEntity.ok(cartService.viewCart(user));
    }

    @PostMapping("/checkout")
    public ResponseEntity<CheckoutResponseDTO> checkout(Authentication auth) {
        User user = userService.getCurrentUser(auth);
        return ResponseEntity.ok(cartService.checkout(user));
    }
}