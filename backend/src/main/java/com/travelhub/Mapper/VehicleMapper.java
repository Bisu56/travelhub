package com.travelhub.Mapper;

import com.travelhub.Dtos.*;
import com.travelhub.entity.*;

public class VehicleMapper {

    public static VehicleOffering toEntity(VehicleRequestDTO dto, User agent) {
        return VehicleOffering.builder()
                .vehicleType(dto.getVehicleType())
                .location(dto.getLocation())
                .description(dto.getDescription())
                .totalSeats(dto.getTotalSeats())
                .pricePerSeat(dto.getPricePerSeat())
                .fullVehiclePricePerDay(dto.getFullVehiclePricePerDay())
                .createdBy(agent)
                .approvalStatus(com.travelhub.entity.enums.PackageStatus.DRAFT)
                .active(true)
                .build();
    }

    public static VehicleResponseDTO toDTO(VehicleOffering vehicle) {
        return VehicleResponseDTO.builder()
                .id(vehicle.getId())
                .vehicleType(vehicle.getVehicleType())
                .location(vehicle.getLocation())
                .description(vehicle.getDescription())
                .totalSeats(vehicle.getTotalSeats())
                .pricePerSeat(vehicle.getPricePerSeat())
                .fullVehiclePricePerDay(vehicle.getFullVehiclePricePerDay())
                .approvalStatus(vehicle.getApprovalStatus())
                .createdByEmail(vehicle.getCreatedBy() != null ? vehicle.getCreatedBy().getEmail() : null)
                .approvedByEmail(vehicle.getApprovedBy() != null ? vehicle.getApprovedBy().getEmail() : null)
                .approvedAt(vehicle.getApprovedAt())
                .rejectionReason(vehicle.getRejectionReason())
                .build();
    }

    public static VehicleBookingResponseDTO bookingToDTO(VehicleBooking booking) {
        return VehicleBookingResponseDTO.builder()
                .id(booking.getId())
                .vehicleId(booking.getVehicle().getId())
                .vehicleType(booking.getVehicle().getVehicleType())
                .seatCount(booking.getSeatCount())
                .days(booking.getDays())
                .fullVehicle(booking.getFullVehicle())
                .totalPrice(booking.getTotalPrice())
                .bookingStatus(booking.getBookingStatus())
                .paymentStatus(booking.getPaymentStatus())
                .build();
    }
}