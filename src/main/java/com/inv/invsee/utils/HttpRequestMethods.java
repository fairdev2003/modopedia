package com.inv.invsee.utils;

import okhttp3.Call;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class HttpRequestMethods {

    public static String GET = "GET";
    public static String POST = "POST";
    public static String PUT = "PUT";
    public static String DELETE = "DELETE";
    public static String UPDATE = "UPDATE";

    public static void makeRequest (String type, String content) {
        OkHttpClient client = new OkHttpClient();

        Request request = new Request.Builder()
                .url("")
                .build();

        Call call = client.newCall(request);

        Request response = call.request();

    }


}
