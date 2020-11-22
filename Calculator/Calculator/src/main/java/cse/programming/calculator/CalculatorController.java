package cse.programming.calculator;

import org.springframework.boot.autoconfigure.*;
import org.springframework.web.bind.annotation.*;
//If you are using a different server and port 
//Please change this http://127.0.0.1:3000 to it
@CrossOrigin(origins = { "http://127.0.0.1:3000"})
@RestController
@EnableAutoConfiguration
public class CalculatorController {

	@GetMapping("/add")
	public String add(@RequestParam(value = "a") String a,
			@RequestParam(value = "b") String b ) {
		double first = Double.parseDouble(a);
		double second = Double.parseDouble(b);
		return Calculator.add(first, second)+"";
	}
	@GetMapping("/subtract")
	public String subtract(@RequestParam(value = "a") String a,
			@RequestParam(value = "b") String b ) {
		double first = Double.parseDouble(a);
		double second = Double.parseDouble(b);
		return Calculator.subtract(first, second)+"";
	}
	@GetMapping("/multiply")
	public String multiply(@RequestParam(value = "a") String a,
			@RequestParam(value = "b") String b ) {
		double first = Double.parseDouble(a);
		double second = Double.parseDouble(b);
		return Calculator.multiply(first, second)+"";
	}
	@GetMapping("/divide")
	public String divide(@RequestParam(value = "a") String a,
			@RequestParam(value = "b") String b ) {
		double first = Double.parseDouble(a);
		double second = Double.parseDouble(b);
		if(second == 0)
			return "E";
		return Calculator.divide(first, second)+"";
	}
	@GetMapping("/mod")
	public String mod(@RequestParam(value = "a") String a,
			@RequestParam(value = "b") String b ) {
		long first = Long.parseLong(a);
		long second = Long.parseLong(b);
		if(second == 0)
			return "E";
		return Calculator.mod(first, second)+"";
	}
	@GetMapping("/sqrt")
	public String sqrt(@RequestParam(value = "a") String a) {
		double first = Double.parseDouble(a);
		return Calculator.sqrt(first)+"";
	}
}