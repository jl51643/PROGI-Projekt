package hr.fer.progi.stopWaste.security.services;

import hr.fer.progi.stopWaste.dao.UserRepository;
import hr.fer.progi.stopWaste.domain.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

   final
   UserRepository userRepository;

   public UserDetailsServiceImpl(UserRepository userRepository) {
      this.userRepository = userRepository;
   }

   @Override
   @Transactional
   public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
      User user = userRepository.findByUsername(username)
              .orElseThrow(() -> new UsernameNotFoundException("User with username: " + username +" not found"));

      return UserDetailsImpl.build(user);
   }
}
