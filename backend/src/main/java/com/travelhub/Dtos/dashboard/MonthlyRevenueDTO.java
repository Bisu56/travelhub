package com.travelhub.Dtos.dashboard;

import java.time.LocalDate;

public record MonthlyRevenueDTO(
        LocalDate month,
        Double revenue
) {}