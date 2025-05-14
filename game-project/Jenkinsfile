pipeline {
  agent any

  stages {
    stage('Instalar dependencias') {
      steps {
        dir('game-project') {
          bat 'npm install'
        }
      }
    }

    stage('Ejecutar pruebas unitarias') {
      steps {
        dir('game-project') {
          bat 'npm test'
        }
      }
    }

    stage('Construir proyecto') {
      steps {
        dir('game-project') {
          bat 'npm run build'
        }
      }
    }
  }
}
