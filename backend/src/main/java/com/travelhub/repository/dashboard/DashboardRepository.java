package com.travelhub.repository.dashboard;

import com.travelhub.Dtos.dashboard.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DashboardRepository extends JpaRepository<com.travelhub.entity.Payment, Long> {

    // TOTAL REVENUE
    @Query("""
        SELECT COALESCE(SUM(p.amount),0)
        FROM Payment p
        WHERE p.paymentStatus = 'SUCCESS'
    """)
    Double getTotalRevenue();


    // TOP AGENTS
    @Query("""
        SELECT new com.travelhub.Dtos.dashboard.TopAgentDTO(
            a.id,
            a.name,
            COALESCE(SUM(p.amount),0)
        )
        FROM Payment p
        JOIN p.booking b
        JOIN b.travelPackage tp
        JOIN tp.agent a
        WHERE p.paymentStatus = 'SUCCESS'
        GROUP BY a.id, a.name
        ORDER BY SUM(p.amount) DESC
    """)
    List<TopAgentDTO> getTopAgents(org.springframework.data.domain.Pageable pageable);


    // MONTHLY REVENUE
    @Query("""
        SELECT new com.travelhub.Dtos.dashboard.MonthlyRevenueDTO(
            FUNCTION('DATE_TRUNC','month',p.createdAt),
            COALESCE(SUM(p.amount),0)
        )
        FROM Payment p
        WHERE p.paymentStatus = 'SUCCESS'
        GROUP BY FUNCTION('DATE_TRUNC','month',p.createdAt)
        ORDER BY FUNCTION('DATE_TRUNC','month',p.createdAt)
    """)
    List<MonthlyRevenueDTO> getMonthlyRevenue();


    // AGENT MONTHLY
    @Query("""
        SELECT new com.travelhub.Dtos.dashboard.MonthlyRevenueDTO(
            FUNCTION('DATE_TRUNC','month',p.createdAt),
            COALESCE(SUM(p.amount),0)
        )
        FROM Payment p
        JOIN p.booking b
        JOIN b.travelPackage tp
        WHERE tp.agent.id = :agentId
        AND p.paymentStatus = 'SUCCESS'
        GROUP BY FUNCTION('DATE_TRUNC','month',p.createdAt)
        ORDER BY FUNCTION('DATE_TRUNC','month',p.createdAt)
    """)
    List<MonthlyRevenueDTO> getAgentMonthlyRevenue(Long agentId);
}