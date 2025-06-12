package com.example.demo.service;

import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ConductanceService {

    // Step 1: Get the minimum value from the list
    private double minValue(List<Double> list) {
        return Collections.min(list);
    }

    // Step 2: Normalize and boltzmann-transform the currents
    public List<List<Double>> normalizeCurrents(List<Double> current) {
        List<Double> norm = new ArrayList<>();
        List<Double> boltz = new ArrayList<>();
        double min = minValue(current);

        for (double i : current) {
            norm.add(i / min);
            boltz.add(i / (min * min));
        }

        List<List<Double>> result = new ArrayList<>();
        result.add(norm);  // result[0]
        result.add(boltz); // result[1]
        return result;
    }

    // Step 3: Estimate reversal potential using 3 voltage-boltz pairs
    public double calculateReversalPotential(List<Double> voltage, List<Double> boltz) {
        List<Double> selectedVoltages = voltage.subList(5, 8);
        List<Double> selectedBoltz = boltz.subList(5, 8);

        double sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
        int n = selectedVoltages.size();

        for (int i = 0; i < n; i++) {
            double x = selectedVoltages.get(i);
            double y = selectedBoltz.get(i);

            sumX += x;
            sumY += y;
            sumXY += x * y;
            sumX2 += x * x;
        }

        double m = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
        double b = (sumY - m * sumX) / n;

        return Math.abs(b / m);
    }

    // Step 4: Calculate conductance
    public List<Double> calculateConductance(List<Double> voltage, List<Double> boltz, double reversalPotential) {
        List<Double> conductance = new ArrayList<>();
        for (int i = 0; i < voltage.size(); i++) {
            conductance.add(boltz.get(i) / (voltage.get(i) - reversalPotential));
        }
        return conductance;
    }

    // Step 5: Main exposed method for controller
   public Map<String, Object> processConductance(List<Double> voltage, List<Double> current) {
    List<List<Double>> transformed = normalizeCurrents(current);
    List<Double> boltz = transformed.get(1);

    double reversalPotential = calculateReversalPotential(voltage, boltz);
    List<Double> conductance = calculateConductance(voltage, boltz, reversalPotential);

    // 🧹 Create structured conductance array
    List<Map<String, Object>> structuredConductance = new ArrayList<>();
    for (int i = 0; i < voltage.size(); i++) {
        Map<String, Object> point = new HashMap<>();
        point.put("voltage", voltage.get(i));
        point.put("value", conductance.get(i));
        structuredConductance.add(point);
    }

    // 📦 Final response map
    Map<String, Object> result = new HashMap<>();
    result.put("reversalPotential_mV", reversalPotential);
    result.put("conductance_Siemens", structuredConductance);
    return result;
}

}
