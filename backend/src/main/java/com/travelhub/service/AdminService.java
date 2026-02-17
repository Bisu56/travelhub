package com.travelhub.service;
import com.travelhub.entity.AgentProfile;
import com.travelhub.repository.AgentProfileRepository;
import com.travelhub.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final AgentProfileRepository agentProfileRepository;
    private final UserRepository userRepository;
    private final AuditService auditLogService;

    public AgentProfile approveAgent(Long agentId) {
        AgentProfile agent = agentProfileRepository.findById(agentId)
                .orElseThrow(() -> new RuntimeException("Agent not found"));
        agent.setApprovalStatus(true);
        agentProfileRepository.save(agent);
        auditLogService.logAdminAction("Approved agent with ID " + agentId);
        return agent;
    }

    public AgentProfile rejectAgent(Long agentId) {
        AgentProfile agent = agentProfileRepository.findById(agentId)
                .orElseThrow(() -> new RuntimeException("Agent not found"));
        agent.setApprovalStatus(false);
        agentProfileRepository.save(agent);
        auditLogService.logAdminAction("Rejected agent with ID " + agentId);
        return agent;
    }

    public List<AgentProfile> listPendingAgents() {
        return agentProfileRepository.findByApprovalStatus(false);
    }
}
