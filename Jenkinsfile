pipeline {
  agent any

  stages {
    stage('Instalar dependencias') {
      steps {
        bat 'npm install'
      }
    }

    stage('Ejecutar pruebas unitarias') {
      steps {
        bat 'npm test'
      }
    }

    stage('Construir proyecto') {
      steps {
        bat 'npm run build'
      }
    }
  }
}
