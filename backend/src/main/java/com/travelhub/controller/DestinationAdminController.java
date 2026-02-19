package com.travelhub.controller;
import org.springframework.security.core.Authentication;

import com.travelhub.entity.DestinationPackage;
import com.travelhub.service.DestinationAdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/destinations")
@RequiredArgsConstructor
public class DestinationAdminController {

    private final DestinationAdminService service;

    @PostMapping("/{id}/approve")
    public ResponseEntity<DestinationPackage> approve(@PathVariable Long id) {
        return ResponseEntity.ok(service.approve(id));
    }

    @PostMapping("/{id}/reject")
    public ResponseEntity<DestinationPackage> reject(@PathVariable Long id) {
        return ResponseEntity.ok(service.reject(id));
    }

    @PostMapping("/{id}/publish")
    public ResponseEntity<DestinationPackage> publish(@PathVariable Long id) {
        return ResponseEntity.ok(service.publish(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DestinationPackage> edit(@PathVariable Long id,
                                                   @RequestBody DestinationPackage pkg) {
        return ResponseEntity.ok(service.edit(id, pkg));
    }

    @GetMapping("/pending")
    public ResponseEntity<List<DestinationPackage>> listPending() {
        // Optionally implement list of pending packages
        return ResponseEntity.ok(service.listPendingPackages());
    }
}

