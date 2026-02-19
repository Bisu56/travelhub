package com.travelhub.controller;

import com.travelhub.entity.DestinationPackage;
import com.travelhub.entity.User;
import com.travelhub.service.DestinationAgentService;
import com.travelhub.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/agent/destinations")
@RequiredArgsConstructor
public class DestinationAgentController {

    private final DestinationAgentService service;
    private final UserService userService;

    @PostMapping
    public ResponseEntity<DestinationPackage> create(@RequestBody DestinationPackage pkg,
                                                     Authentication auth) {
        User agent = userService.getCurrentUser(auth);
        return ResponseEntity.ok(service.create(pkg, agent));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DestinationPackage> update(@PathVariable Long id,
                                                     @RequestBody DestinationPackage pkg,
                                                     Authentication auth) {
        User agent = userService.getCurrentUser(auth);
        return ResponseEntity.ok(service.update(id, pkg, agent));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id,
                                         Authentication auth) {
        User agent = userService.getCurrentUser(auth);
        service.delete(id, agent);
        return ResponseEntity.ok("Package soft-deleted");
    }

    @PostMapping("/{id}/submit")
    public ResponseEntity<DestinationPackage> submit(@PathVariable Long id,
                                                     Authentication auth) {
        User agent = userService.getCurrentUser(auth);
        return ResponseEntity.ok(service.submit(id, agent));
    }

    @GetMapping("/my-packages")
    public ResponseEntity<List<DestinationPackage>> myPackages(Authentication auth) {
        User agent = userService.getCurrentUser(auth);
        return ResponseEntity.ok(service.getAgentPackages(agent));
    }
}
