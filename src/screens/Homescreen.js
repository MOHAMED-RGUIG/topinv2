import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts, getAllImgProducts } from '../actions/productAction';
import Product from '../components/product';
import { FaEdit ,FaFilePdf} from 'react-icons/fa';
import Loading from '../components/Loading';
import Error from '../components/Error';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import feather from 'feather-icons';
import { generateAllProductsPDF } from '../components/pdfgenerator';
export default function Homescreen() {
  const dispatch = useDispatch();
  const { products, error, loading } = useSelector(state => state.products);
  const { imgProducts = [] } = useSelector(state => state.imgProducts);

  React.useEffect(() => {
    feather.replace();
  }, []);

  // États pour la recherche et le filtre
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategorie, setSelectedCategorie] = useState('CAFE GRAIN');
  const [selectedSubCategorie, setSelectedSubCategorie] = useState(''); // New state for subfamily

  // Charger les produits
  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllImgProducts());
  }, [dispatch]);
 const handleExportAllProducts = () => {
    generateAllProductsPDF(filteredProducts); // Appelle la fonction pour générer le PDF pour tous les produits
  };
  // Fonction pour filtrer les produits par ETATINV et DESINV_0
  const filteredProducts = products.filter((product) => {
    const searchLower = searchQuery.toLowerCase();
  
    // Vérifie si ETATINV et DESINV_0 existent, sinon utilise une chaîne vide ''
    const etatinv = product.ETATINV ? product.ETATINV.toLowerCase() : '';
    const desinv = product.DESINV_0 ? product.DESINV_0.toLowerCase() : '';
  
    return (
      etatinv.includes(searchLower) || // Recherche dans ETATINV
      desinv.includes(searchLower)    // Recherche dans DESINV_0
    );
  });

  const handleCategoryChange = (Designation_Famille_Stat1) => {
    setSelectedCategorie(Designation_Famille_Stat1);
    setSelectedSubCategorie(''); // Reset subfamily when main category changes
  };

  const handleSubCategoryChange = (TSICOD_1) => {
    setSelectedSubCategorie(TSICOD_1);
  };

  return (
    <div className='justify-content-center mx-auto'>
      <div className="col-11 col-md-11 mt-5 mb-3 headerhomescreen mx-auto">
      </div>    

      {/* Barre de recherche */}
      <div className='search-bar col-10 col-xl-10 col-md-10 text-center mb-2 mx-auto'>
        <input
          className="form-control text-center"
          id="search-input"
          type='search'
          placeholder='Rechercher par ETAT ou DESINV...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
 {/* Bouton d'exportation pour tous les produits  <div className="col-8 text-center mb-3 mx-auto">
<button className="btn5 btn-sm btn-outline-danger d-flex align-items-center style={{width:'60%'}}"  onClick={handleExportAllProducts}>
                  <FaFilePdf size={12} className="me-1" />Exporter PDF
                </button></div>*/}

  {/*  <div className="col-12 text-center mb-3">
              <button
                className="btn5 btn-primary"
                onClick={handleExportAllProducts}
              >
                Exporter tous les produits en PDF
              </button>
            </div>*/}
            {/* Bouton d'exportation pour tous les produits */}  
      {/* Liste des produits */}
      <div className='row justify-content-center col-xl-12 col-md-12 col-12 mx-auto heading'>
      <div class="col-md-4"><h5>Date</h5></div>
      <div class="col-md-4"><h5>Référence</h5></div>
      <div class="col-md-4"><h5>Statuts</h5></div>

      </div>
        <div className='body-details'>
        {loading ? (
          <Loading />
        ) : error ? (
          <Error error='Something went wrong' />
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.REFINV_0} className='col-12 col-md-12'>
              <Product product={product} />
            </div>
          ))
        ) : (
          <p className="text-center">Aucun produit trouvé.</p>
        )}
      </div>
    </div>
  );
}
