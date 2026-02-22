package com.travelhub.service;
import com.travelhub.entity.AgentProfile;
import com.travelhub.entity.User;
import com.travelhub.repository.AgentProfileRepository;
import com.travelhub.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.travelhub.Dtos.AgentAdminDTO;
import com.travelhub.Dtos.UserAdminDTO;

import java.util.List;
@Service
@RequiredArgsConstructor
public class AdminService {

    private final AgentProfileRepository agentProfileRepository;
    private final UserRepository userRepository;
    private final AuditService auditLogService;

    public AgentProfile approveAgent(Long agentId) {

        AgentProfile agent = getAgent(agentId);

        agent.setApprovalStatus(true);
        agentProfileRepository.save(agent);

        auditLogService.logAdminAction("Approved agent ID " + agentId);

        return agent;
    }

    public AgentProfile rejectAgent(Long agentId) {

        AgentProfile agent = getAgent(agentId);

        agent.setApprovalStatus(false);
        agentProfileRepository.save(agent);

        auditLogService.logAdminAction("Rejected agent ID " + agentId);

        return agent;
    }

    public List<AgentProfile> listPendingAgents() {
        return agentProfileRepository.findByApprovalStatus(false);
    }
    private List<User> getAllUsers() {
        return userRepository.findAll().stream()
                .filter(u -> Boolean.TRUE.equals(u.getActive()))
                .toList();
    }

    private List<AgentProfile> getAllAgents() {
        return agentProfileRepository.findAll().stream()
                .filter(a -> !Boolean.TRUE.equals(a.getDeleted()))
                .toList();
    }

    public List<UserAdminDTO> getAllUsersDTO() {
        return getAllUsers().stream()
                .map(u -> UserAdminDTO.builder()
                        .id(u.getId())
                        .email(u.getEmail())
                        .phone(u.getPhone())
                        .firstName(u.getFirstName())
                        .lastName(u.getLastName())
                        .role(u.getRole())
                        .emailVerified(u.getEmailVerified())
                        .phoneVerified(u.getPhoneVerified())
                        .active(u.getActive())
                        .createdAt(u.getCreatedAt())
                        .build())
                .toList();
    }

    public List<AgentAdminDTO> getAllAgentsDTO() {
        return getAllAgents().stream()
                .map(a -> AgentAdminDTO.builder()
                        .id(a.getId())
                        .licenseNumber(a.getLicenseNumber())
                        .companyName(a.getCompanyName())
                        .approvalStatus(a.getApprovalStatus())
                        .deleted(a.getDeleted())
                        .email(a.getUser() != null ? a.getUser().getEmail() : null)
                        .phone(a.getUser() != null ? a.getUser().getPhone() : null)
                        .build())
                .toList();
    }
    public void deleteAgent(Long agentId) {

        AgentProfile agent = getAgent(agentId);

        agent.setDeleted(true);
        agent.setApprovalStatus(false);

        if (agent.getUser() != null) {
            agent.getUser().setActive(false);
        }

        agentProfileRepository.save(agent);

        auditLogService.logAdminAction("Deleted agent ID " + agentId);
    }
    public void deleteUser(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setActive(false);
        userRepository.save(user);

        auditLogService.logAdminAction("Deleted user ID " + userId);
    }

    private AgentProfile getAgent(Long agentId) {

        AgentProfile agent = agentProfileRepository.findById(agentId)
                .orElseThrow(() -> new RuntimeException("Agent not found"));

        if (Boolean.TRUE.equals(agent.getDeleted())) {
            throw new RuntimeException("Agent already deleted");
        }

        return agent;
    }
}