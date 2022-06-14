package com.example.demo.helperObjects;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

public class FrontendOptions {
    private HashMap<String,List<String>> health_guard;
    private HashMap<String,List<String>> health_infinity;
    private HashMap<String,List<String>>  critical_illness;

    public FrontendOptions(){
        health_guard = new HashMap<>();
        health_infinity = new HashMap<>();
        critical_illness = new HashMap<>();

        String[] sub_plans = {"silver","gold","premium"};
        String[] cover = {"150000","200000","300000","400000","500000","750000","1000000","1500000","2000000","2500000","3000000","3500000","4000000","4500000","5000000"};
        String[] diseases = {"cataract_surgery","Road_Ambulance","Bariatric_surgery","Mental_illness","modern_advanced_methods","Ayurvedic/Homeopathic","MaternityNormal_delivery","MaternityCaesarian_delivery"};
        String[] co_pay = {"10","15","20","25"};

        health_guard.put("sub_plans", Arrays.asList(sub_plans));
        health_guard.put("cover",Arrays.asList(cover));
        health_guard.put("diseases",Arrays.asList(diseases));
        health_guard.put("co_pay",Arrays.asList(co_pay));

        cover = new String[]{"100000","200000","300000","400000","500000","1000000","2000000","3000000","4000000","5000000"};
        diseases = new String[]{"Heart attack","Open chest CABG","Stroke permanent symptoms","Cancer","Kidney failure","Major organ transplant","Surgery of Aorta"};

        critical_illness.put("cover",Arrays.asList(cover));
        critical_illness.put("diseases",Arrays.asList(diseases));

        co_pay = new String[]{"15","20","25"};
        String[] opted_rent = {"3000","4000","5000","8000","10000","15000","20000","25000","30000","35000","40000"};

        health_infinity.put("co_pay",Arrays.asList(co_pay));
        health_infinity.put("opted_rent",Arrays.asList(opted_rent));
    }

    public HashMap<String, List<String>> getHealth_guard() {
        return health_guard;
    }

    public HashMap<String, List<String>> getHealth_infinity() {
        return health_infinity;
    }

    public HashMap<String, List<String>> getCritical_illness() {
        return critical_illness;
    }
}
