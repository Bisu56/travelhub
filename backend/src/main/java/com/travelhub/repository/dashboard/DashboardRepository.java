package com.travelhub.repository.dashboard;

import com.travelhub.Dtos.dashboard.MonthlyRevenueDTO;
import com.travelhub.Dtos.dashboard.TopAgentDTO;
import com.travelhub.entity.Payment;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DashboardRepository extends JpaRepository<Payment, Long> {

    @Query("SELECT COALESCE(SUM(p.amount),0) FROM Payment p WHERE p.paymentStatus = 'PAID'")
    Double getTotalRevenue();

    @Query("SELECT COUNT(u) FROM User u WHERE u.role = 'USER'")
    Long getTotalUsers();

    @Query("SELECT COUNT(u) FROM User u WHERE u.role = 'AGENT'")
    Long getTotalAgents();

    @Query("SELECT COUNT(b) FROM VehicleBooking b")
    Long getTotalVehicleBookings();

    @Query("SELECT COUNT(b) FROM VehicleBooking b WHERE b.bookingStatus = 'CONFIRMED'")
    Long getConfirmedVehicleBookings();

    @Query("SELECT COUNT(p) FROM Payment p WHERE p.paymentStatus = 'UNPAID'")
    Long getPendingPayments();

    @Query("SELECT COUNT(p) FROM Payment p WHERE p.paymentStatus = 'FAILED'")
    Long getFailedPayments();

    @Query("SELECT new com.travelhub.Dtos.dashboard.MonthlyRevenueDTO(" +
            "FUNCTION('DATE_TRUNC','month',p.createdAt), COALESCE(SUM(p.amount),0)) " +
            "FROM Payment p WHERE p.paymentStatus = 'PAID' " +
            "GROUP BY FUNCTION('DATE_TRUNC','month',p.createdAt) " +
            "ORDER BY FUNCTION('DATE_TRUNC','month',p.createdAt)")
    List<MonthlyRevenueDTO> getMonthlyRevenue();

    @Query("SELECT new com.travelhub.Dtos.dashboard.TopAgentDTO(" +
            "v.vehicle.createdBy.id, " +
            "CONCAT(v.vehicle.createdBy.firstName, ' ', v.vehicle.createdBy.lastName), " +
            "CAST(SUM(v.totalPrice) AS double)) " +
            "FROM VehicleBooking v " +
            "WHERE v.bookingStatus = 'CONFIRMED' " +
            "GROUP BY v.vehicle.createdBy.id, v.vehicle.createdBy.firstName, v.vehicle.createdBy.lastName " +
            "ORDER BY SUM(v.totalPrice) DESC")
    List<TopAgentDTO> getTopVehicleAgents(Pageable pageable);

    @Query("SELECT new com.travelhub.Dtos.dashboard.TopAgentDTO(" +
            "f.flight.createdBy.id, " +
            "CONCAT(f.flight.createdBy.firstName, ' ', f.flight.createdBy.lastName), " +
            "CAST(SUM(f.totalPrice) AS double)) " +
            "FROM FlightBooking f " +
            "WHERE f.bookingStatus = 'CONFIRMED' " +
            "GROUP BY f.flight.createdBy.id, f.flight.createdBy.firstName, f.flight.createdBy.lastName " +
            "ORDER BY SUM(f.totalPrice) DESC")
    List<TopAgentDTO> getTopFlightAgents(Pageable pageable);

    @Query("SELECT new com.travelhub.Dtos.dashboard.TopAgentDTO(" +
            "d.destinationPackage.createdBy.id, " +
            "CONCAT(d.destinationPackage.createdBy.firstName, ' ', d.destinationPackage.createdBy.lastName), " +
            "CAST(SUM(d.totalPrice) AS double)) " +
            "FROM DestinationBooking d " +
            "WHERE d.bookingStatus = 'CONFIRMED' " +
            "GROUP BY d.destinationPackage.createdBy.id, d.destinationPackage.createdBy.firstName, d.destinationPackage.createdBy.lastName " +
            "ORDER BY SUM(d.totalPrice) DESC")
    List<TopAgentDTO> getTopDestinationAgents(Pageable pageable);

    @Query("SELECT new com.travelhub.Dtos.dashboard.MonthlyRevenueDTO(" +
            "FUNCTION('DATE_TRUNC','month',v.createdAt), CAST(SUM(v.totalPrice) AS double)) " +
            "FROM VehicleBooking v " +
            "WHERE v.bookingStatus = 'CONFIRMED' AND v.vehicle.createdBy.id = :agentId " +
            "GROUP BY FUNCTION('DATE_TRUNC','month',v.createdAt) " +
            "ORDER BY FUNCTION('DATE_TRUNC','month',v.createdAt)")
    List<MonthlyRevenueDTO> getVehicleMonthlyRevenue(Long agentId);

    @Query("SELECT new com.travelhub.Dtos.dashboard.MonthlyRevenueDTO(" +
            "FUNCTION('DATE_TRUNC','month',f.createdAt), CAST(SUM(f.totalPrice) AS double)) " +
            "FROM FlightBooking f " +
            "WHERE f.bookingStatus = 'CONFIRMED' AND f.flight.createdBy.id = :agentId " +
            "GROUP BY FUNCTION('DATE_TRUNC','month',f.createdAt) " +
            "ORDER BY FUNCTION('DATE_TRUNC','month',f.createdAt)")
    List<MonthlyRevenueDTO> getFlightMonthlyRevenue(Long agentId);

    @Query("SELECT new com.travelhub.Dtos.dashboard.MonthlyRevenueDTO(" +
            "FUNCTION('DATE_TRUNC','month',d.createdAt), CAST(SUM(d.totalPrice) AS double)) " +
            "FROM DestinationBooking d " +
            "WHERE d.bookingStatus = 'CONFIRMED' AND d.destinationPackage.createdBy.id = :agentId " +
            "GROUP BY FUNCTION('DATE_TRUNC','month',d.createdAt) " +
            "ORDER BY FUNCTION('DATE_TRUNC','month',d.createdAt)")
    List<MonthlyRevenueDTO> getDestinationMonthlyRevenue(Long agentId);
}