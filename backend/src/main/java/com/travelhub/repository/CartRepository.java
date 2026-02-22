package com.travelhub.repository;

import com.travelhub.entity.Cart;
import com.travelhub.entity.User;
import com.travelhub.entity.enums.CartStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {

    Optional<Cart> findByUserAndStatus(User user, CartStatus status);
}