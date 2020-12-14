package com.hexclan.tparchitecture.security.jwt;

import com.hexclan.tparchitecture.exception.ErrorResponse;
import com.hexclan.tparchitecture.exception.apirequestexception.BadRequestException;
import com.hexclan.tparchitecture.security.MyUserDetails;
import com.hexclan.tparchitecture.security.MyUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.ZonedDateTime;

import static org.springframework.util.StringUtils.hasText;

@Component
public class JwtFilter extends OncePerRequestFilter {

    public static final String AUTHORIZATION = "Authorization";

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private MyUserDetailsService myUserDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest servletRequest, HttpServletResponse servletResponse, FilterChain filterChain) throws ServletException, IOException {
        String token = getTokenFromRequest((HttpServletRequest) servletRequest);
        if (token != null && jwtProvider.isTokenValid(token)) {
            String username = jwtProvider.getUsernameFromToken(token);
            MyUserDetails doodleMyUserDetails = null;
            try {
                doodleMyUserDetails = myUserDetailsService.loadUserByUsername(username);

                UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(doodleMyUserDetails, null,
                        doodleMyUserDetails.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(auth);
                servletRequest.setAttribute("username", username);
            } catch (BadRequestException e) {
                ErrorResponse errorResponse = new ErrorResponse(e.getMessage(), HttpStatus.FORBIDDEN, HttpStatus.FORBIDDEN.value(), ZonedDateTime.now());

                servletResponse.setStatus(HttpStatus.FORBIDDEN.value());
                servletResponse.getWriter().write(String.valueOf(errorResponse));
            }

        }
        filterChain.doFilter(servletRequest, servletResponse);
    }

    private String getTokenFromRequest(HttpServletRequest request) {
        String bearer = request.getHeader(AUTHORIZATION);
        if (hasText(bearer) && bearer.startsWith("Bearer ")) {
            return bearer.substring(7);
        }
        return null;
    }


}
