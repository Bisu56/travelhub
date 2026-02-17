package com.travelhub.repository;

import com.travelhub.entity.AgentProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AgentProfileRepository extends JpaRepository<AgentProfile, Long> {

    List<AgentProfile> findByApprovalStatus(Boolean status);
}
