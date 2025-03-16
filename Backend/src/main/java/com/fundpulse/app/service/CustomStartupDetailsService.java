package com.fundpulse.app.service;

import com.fundpulse.app.repository.StartupRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomStartupDetailsService implements UserDetailsService {

    @Autowired
    private StartupRepo startupRepo;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        return startupRepo.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email " + email));
    }
}
