package com.travelhub.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
    @Table(name = "cart_items")
    @Getter
    @Setter
    public class CartItem {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @ManyToOne
        private Cart cart;

        private Long referenceId;
        // flightId / vehicleId / destinationPackageId

        @Enumerated(EnumType.STRING)
        private ServiceType serviceType;
        // FLIGHT, VEHICLE, DESTINATION

        private Integer quantity;

        private BigDecimal unitPrice;

        private BigDecimal subtotal;

        private LocalDate startDate;  // for vehicle
        private LocalDate endDate;    // for vehicle

        private LocalDate travelDate; // for flight/destination
    }
