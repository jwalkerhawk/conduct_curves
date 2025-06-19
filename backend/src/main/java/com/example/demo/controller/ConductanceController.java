package com.example.demo.controller;

import com.example.demo.service.ConductanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/conductance")
public class ConductanceController {

    @Autowired
    private ConductanceService conductanceService;

    @PostMapping("/calculate")
    public Map<String, Object> calculate(@RequestBody Map<String, List<Double>> input) {
        List<Double> voltage = input.get("voltage");
        List<Double> current = input.get("current");

        return conductanceService.processConductance(voltage, current);
    }
}
