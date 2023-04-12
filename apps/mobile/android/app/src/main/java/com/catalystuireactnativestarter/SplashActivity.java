package com.catalystuireactnativestarter;

import android.content.Intent;
import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;

public class SplashActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState){
        super.onCreate(savedInstanceState);

        // Intent intent = new Intent(this, MainActivity.class);
        // startActivity(intent);
        // finish();
        Intent intent = new Intent(this, MainActivity.class);
        startActivity(intent);

        // remove this activity from the stack
        finish();
    }
}
