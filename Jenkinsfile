pipeline {
    agent any
    stages {
        stage('Frontend build') {
            steps {
                bat 'IF %ERRORLEVEL% EQU 1 (exit /B 0) ELSE (exit /B 1)'''
                echo 'building reactjs'
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
