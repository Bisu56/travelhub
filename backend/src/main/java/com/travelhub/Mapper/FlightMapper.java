package com.travelhub.Mapper;

import com.travelhub.Dtos.*;
import com.travelhub.entity.*;

public class FlightMapper {

    public static Flight toEntity(FlightRequestDTO dto, User agent) {
        return Flight.builder()
                .airlineName(dto.getAirlineName())
                .flightNumber(dto.getFlightNumber())
                .departureCountry(dto.getDepartureCountry())
                .departureCity(dto.getDepartureCity())
                .arrivalCountry(dto.getArrivalCountry())
                .arrivalCity(dto.getArrivalCity())
                .type(dto.getType())
                .departureDate(dto.getDepartureDate())
                .arrivalDate(dto.getArrivalDate())
                .totalSeats(dto.getTotalSeats())
                .imageUrls(dto.getImageUrls())
                .classPrices(dto.getClassPrices())
                .createdBy(agent)
                .build();
    }

    public static FlightResponseDTO toDTO(Flight f) {
        return FlightResponseDTO.builder()
                .id(f.getId())
                .airlineName(f.getAirlineName())
                .flightNumber(f.getFlightNumber())
                .departureCountry(f.getDepartureCountry())
                .departureCity(f.getDepartureCity())
                .arrivalCountry(f.getArrivalCountry())
                .arrivalCity(f.getArrivalCity())
                .type(f.getType())
                .departureDate(f.getDepartureDate())
                .arrivalDate(f.getArrivalDate())
                .totalSeats(f.getTotalSeats())
                .status(f.getStatus())
                .imageUrls(f.getImageUrls())
                .classPrices(f.getClassPrices())
                .ratingAverage(f.getRatingAverage())
                .totalReviews(f.getTotalReviews())
                .agentId(f.getCreatedBy() != null ? f.getCreatedBy().getId() : null)
                .agentEmail(f.getCreatedBy() != null ? f.getCreatedBy().getEmail() : null)
                .build();
    }


    public static FlightBookingResponseDTO bookingToDTO(FlightBooking booking) {

        return FlightBookingResponseDTO.builder()
                .id(booking.getId())
                .flightId(booking.getFlight().getId())
                .airlineName(booking.getFlight().getAirlineName())
                .flightNumber(booking.getFlight().getFlightNumber())
                .passengers(booking.getPassengers())
                .flightClass(booking.getFlightClass().name())
                .totalPrice(booking.getTotalPrice())
                .bookingStatus(booking.getBookingStatus().name())
                .paymentStatus(booking.getPaymentStatus().name())
                .rejectionReason(booking.getRejectionReason())

                .build();
    }
}