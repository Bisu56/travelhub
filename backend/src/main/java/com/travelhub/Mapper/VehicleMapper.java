package com.travelhub.Mapper;

import com.travelhub.Dtos.*;
import com.travelhub.entity.*;

public class VehicleMapper {

    public static VehicleOffering toEntity(VehicleRequestDTO dto, User agent) {
        return VehicleOffering.builder()
                .createdBy(agent)
                .vehicleType(dto.getVehicleType())
                .description(dto.getDescription())
                .location(dto.getLocation())
                .pricePerSeat(dto.getPricePerSeat())
                .fullVehiclePricePerDay(dto.getFullVehiclePricePerDay())
                .totalSeats(dto.getTotalSeats())
                .availableSeats(dto.getTotalSeats())
                .active(true)
                .build();
    }

    public static VehicleResponseDTO toDTO(VehicleOffering vehicle) {
        return VehicleResponseDTO.builder()
                .id(vehicle.getId())
                .vehicleType(vehicle.getVehicleType())
                .description(vehicle.getDescription())
                .location(vehicle.getLocation())
                .pricePerSeat(vehicle.getPricePerSeat())
                .fullVehiclePricePerDay(vehicle.getFullVehiclePricePerDay())
                .totalSeats(vehicle.getTotalSeats())
                .availableSeats(vehicle.getAvailableSeats())
                .approvalStatus(vehicle.getApprovalStatus())
                .rejectionReason(vehicle.getRejectionReason())
                .active(vehicle.getActive())
                .createdByEmail(vehicle.getCreatedBy() != null ? vehicle.getCreatedBy().getEmail() : null)
                .approvedByEmail(vehicle.getApprovedBy() != null ? vehicle.getApprovedBy().getEmail() : null)
                .approvedAt(vehicle.getApprovedAt())
                .build();
    }

    public static VehicleBookingResponseDTO bookingToDTO(VehicleBooking booking) {
        return VehicleBookingResponseDTO.builder()
                .id(booking.getId())
                .vehicleId(booking.getVehicle().getId())
                .vehicleType(booking.getVehicle().getVehicleType())
                .userId(booking.getUser().getId())
                .userEmail(booking.getUser().getEmail())
                .seatCount(booking.getSeatCount())
                .fullVehicle(booking.getFullVehicle())
                .days(booking.getDays())
                .totalPrice(booking.getTotalPrice())
                .bookingStatus(booking.getBookingStatus())
                .paymentStatus(booking.getPaymentStatus())
                .rejectionReason(booking.getRejectionReason())
                .build();
    }
}