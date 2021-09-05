function zeroesToLeft(newa) {

  let nextTakeableSpot = 0;

  for (let i=0; i < newa.length; i++) {

    const num = newa[i];

      if (num !== 0) {
          continue;
      }



    for (let j=i-1; j >= nextTakeableSpot; j--) {

      const numj = newa[j];

      newa[j + 1] =  numj;

    }   

      newa[nextTakeableSpot] = 0;

      nextTakeableSpot++;

  }

  return newa;

}
