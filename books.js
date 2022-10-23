class Books {
  constructor(
    kitapNo,
    adi,
    yazarNo,
    yayineviNo,
    dolapNo,
    kategoriNo,
    hakkinda,
    kapakresmiNo,
    stok,
    sayfaSayisi
  ) {
    this.kitapNo = kitapNo;
    this.adi = adi;
    this.yazarNo = yazarNo;
    this.yayineviNo = yayineviNo;
    this.dolapNo = dolapNo;
    this.kategoriNo = kategoriNo;
    this.hakkinda = hakkinda;
    this.kapakresmiNo = kapakresmiNo;
    this.stok = stok;
    this.sayfaSayisi = sayfaSayisi;
  }
}

module.exports = Books;
