for(let i=0 ; i<result.length ; i++) {
    
    for( let j=0 ; j<result[i].nombre.length ; j++) {
      if(i<12) {
        asterisco += "*";
      } else {
        asterisco += result[i].numerotarjeta[j];
      }
    }
    result[i].numerotarjeta = asterisco;
}