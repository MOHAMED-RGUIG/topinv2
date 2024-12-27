import React from 'react';

function menuscreen() {
  return (
    <div className="container Body-Home">
  <div className="row">
    {/* Row for the first two buttons */}
    <div className="col-md-6">
      <a href="/homescreen" className="home-link link-lstinv">
        <span className="bi bi-journal-check icon-home"></span><br></br>
        <h5>Liste des Inventaires</h5>
        <span className="bi bi-arrow-right arrow-list-inv"></span>
      </a>
    </div>
    <div className="col-md-6">
      <a href="/cart" className="home-link link-creinv">
        <span className="bi bi-boxes d-block icon-home"></span>
        <h5>Création Inventaire</h5>
        <span className="bi bi-arrow-right arrow-crea-inv"></span>
      </a>
    </div>
  </div>

  <div className="row">
    {/* Row for the third and fourth buttons */}
    <div className="col-md-6">
      <a href="/validinv" className="home-link  link-valinv">
        <span className="bi bi-ui-checks d-block icon-home"></span>
        <h5>Validation Inventaire</h5>
        <span className="bi bi-arrow-right arrow-val-inv"></span>
      </a>
    </div>
    <div className="col-md-6">
      <a href="#" className="home-link link-expinv">
        <span className="bi bi-file-earmark-arrow-down d-block icon-home"></span>
        <h5>Exporter <br></br>en Excel</h5>
        <span className="bi bi-arrow-right arrow-export-inv"></span>
      </a>
    </div>
  </div>
</div>

  );
}

export default menuscreen;
