package com.example.demo.Controllers;
import com.example.demo.Exception.BadRequestException;
import com.example.demo.Models.*;
import com.example.demo.Repository.UserRepository;
import com.example.demo.Services.MyUserDetailsService;
import com.example.demo.Util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.logging.Logger;
@CrossOrigin(origins = {"https://hi-estimator-frontend-urtjok3rza-el.a.run.app","http://localhost:4200"}, maxAge = 3600,exposedHeaders = "Access-Control-Allow-Origin")
@RestController
public class UserController {

    private static final Logger LOG = Logger.getLogger(UserController.class.getName());
    @Autowired
    UserRepository userRepository;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtUtil jwtTokenUtil;
    @Autowired
    private MyUserDetailsService userDetailsService;
    //    testing of end points **ADMIN & GENERAL**
    @GetMapping(value = "/hello")
    public String firstPage() {
        return "Hello World";
    }

    //    authenticate user and store jwt token ** EVERYONE **
    @CrossOrigin(exposedHeaders="Access-Control-Allow-Origin")
    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody RequestLogin authenticationRequest) throws Exception {

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authenticationRequest.getEmail(), authenticationRequest.getPassword())
            );
        } catch (BadCredentialsException e) {
            throw new Exception("Incorrect username or password", e);
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getEmail());
        final String jwt = jwtTokenUtil.generateToken(userDetails);
        return ResponseEntity.ok(new ResponseJwt(jwt));
    }

    //    get all available users **ADMIN & GENERAL**
    @CrossOrigin(exposedHeaders="Access-Control-Allow-Origin")
    @RequestMapping(value = "/get/user", method = RequestMethod.GET)
    public Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }

    @CrossOrigin(exposedHeaders="Access-Control-Allow-Origin")
    @RequestMapping(value = "/user/{id}",method = RequestMethod.GET)

    public User getUserById(@PathVariable String id){
        return userRepository.findUserByEmail(id);
    }

    //    add user to the database ** EVERYONE **
    @RequestMapping(value = "/post", method = RequestMethod.POST)
    public void addUser(@RequestBody User user) {
        LOG.info("get Exchange rates info is accessing");
        userRepository.save(user);
    }

//    @ExceptionHandler
//    public ResponseEntity<ExceptionModel> handleException(BadRequestException e){
//        ExceptionModel errorResponse = new ExceptionModel();
//        errorResponse.setMessage(e.getMessage());
//        errorResponse.setStatus(HttpStatus.NOT_FOUND.value());
//        errorResponse.setTimestamp(System.currentTimeMillis());
//        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
//    }
    @PutMapping("/put")
    public String updateUser(
            // @PathVariable(value = "emailid") String emailId,
            @RequestBody User userDetails) throws ResourceNotFoundException {
        //  User user = userRepository.findUserByEmail(emailId);
//        user.setFirstname(userDetails.getFirstname());
//        user.setLastname(userDetails.getLastname());
//        user.setImage(userDetails.getImage());
//        user.setPolicyNumber(userDetails.getPolicyNumber());
//        user.setPurchasedDate(userDetails.getPurchasedDate());
//        user.setDueDate(userDetails.getDueDate());
//        user.setPremiumAmount(userDetails.getPremiumAmount());
//        user.setAlreadyClaimedAmount(user.getAlreadyClaimedAmount());
//        user.setPhone(user.getPhone());
//        user.setAddress(user.getAddress());
        userRepository.save(userDetails);
        return "successfully updated";
    }




    @RequestMapping(value = "/img/{emailid}",method = RequestMethod.GET)
    public User getImage(@PathVariable String emailid){
        User user = userRepository.findUserByEmail(emailid);
        return user;
    }



    @RequestMapping(value = "/img/update",method = RequestMethod.PUT)
    public void updateImage(@RequestBody ImageClass image){
        User user=userRepository.findUserByEmail(image.getEmail());
        user.setImage(image.getImage());
        userRepository.save(user);
    }





}
