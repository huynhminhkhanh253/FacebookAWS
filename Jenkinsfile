pipeline {
    agent any
    stages {
        stage('Frontend build') {
            steps {
                echo 'building reactjs'
                bat label: 'My batch script',
                script: ''' @echo off
                            return_1_if_success.exe   // command which returns 1 in case of success, 0 otherwise
                            IF %ERRORLEVEL% EQU 1 (exit /B 0) ELSE (exit /B 1)'''
                dir("Frontend") {
                    bat 'npm run build'
                }
            }
        }
        stage('Backend build') {
            tools{
                maven 'maven_3_9_1'
            }
            steps {
                echo 'building springboot'
                dir("Backend/facebook-api") {
                    bat 'mvn clean install'
                }
            }
        }
    }
}
