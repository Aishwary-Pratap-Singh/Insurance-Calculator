package com.example.demo.Services;


import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Collection;

// implementing UserDetails for generating authorities of user
public interface UserService extends UserDetails {


    UserDetails loadUserByUsername(String email) throws UsernameNotFoundException;

    Collection<? extends GrantedAuthority> getAuthorities(String role);
}

