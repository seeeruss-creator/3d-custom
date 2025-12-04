import { useEffect, useMemo, useState } from 'react';
import './App.css';
import Viewer3D from './components/Viewer3D';
import ReviewPage from './components/ReviewPage';
import CustomizationPanel from './components/CustomizationPanel';

const defaultMeasurements = {
  chest: 38,
  waist: 32,
  hips: 38,
  shoulders: 18,
  sleeveLength: 25,
  inseam: 30,
};

const defaultPersonalization = {
  initials: '',
  font: 'Serif',
  size: 0.8,
};

const defaultColors = {
  fabric: '#3a5a72',
  lining: '#1e2a35',
  button: '#c8a66a',
  stitching: '#e1d6c7',
};

const fabrics = ['silk', 'linen', 'cotton', 'wool'];
const patterns = ['none', 'minimal-stripe', 'minimal-check', 'embroidery-1', 'embroidery-2'];

const coatStyle = { lapel: 'notch', buttons: 2, pocket: 'flap', vents: 'single' };
const barongStyle = { collar: 'classic', sleeves: 'long', transparency: 0.35, embroidery: 'preset-a' };
const suitStyle = { lapel: 'peak', buttons: 2, pocket: 'jetted', vents: 'double' };
const pantsStyle = { fit: 'regular', pleats: 'none', cuffs: 'none' };

export default function App() {
  const [garment, setGarment] = useState('coat-men');
  const [size, setSize] = useState('medium'); // Added size state for blazers
  const [fit, setFit] = useState('regular'); // Added fit state for all garments
  const [colors, setColors] = useState(defaultColors);
  const [fabric, setFabric] = useState('wool');
  const [pattern, setPattern] = useState('none');
  const [style, setStyle] = useState(coatStyle);
  const [measurements, setMeasurements] = useState(defaultMeasurements);
  const [personalization, setPersonalization] = useState(defaultPersonalization);
  const [designImage, setDesignImage] = useState(null);
  const [notes, setNotes] = useState('');
  const [showReview, setShowReview] = useState(false);
  const [buttons, setButtons] = useState([]);
  const [pantsType, setPantsType] = useState('casual-men');

  useEffect(() => {
    const saved = localStorage.getItem('tailorDesign');
    if (saved) {
      const v = JSON.parse(saved);
      if (v) {
        setGarment(v.garment || 'coat');
        setSize(v.size || 'medium');
        setFit(v.fit || 'regular');
        setColors(v.colors || defaultColors);
        setFabric(v.fabric || 'wool');
        setPattern(v.pattern || 'none');
        setStyle(v.style || coatStyle);
        setMeasurements(v.measurements || defaultMeasurements);
        setPersonalization(v.personalization || defaultPersonalization);
        setDesignImage(v.designImage || null);
        setNotes(v.notes || '');
        setButtons(v.buttons || []);
        setPantsType(v.pantsType || 'casual-men');
      }
    }
  }, []);

  useEffect(() => {
    const s = garment.startsWith('coat') ? coatStyle : garment === 'barong' ? barongStyle : garment.startsWith('suit') ? suitStyle : pantsStyle;
    setStyle(s);
  }, [garment]);

  const summary = useMemo(() => ({
    garment,
    size,
    fit,
    colors,
    fabric,
    pattern,
    style,
    measurements,
    personalization,
    designImage,
    notes,
    buttons,
    pantsType,
  }), [garment, size, fit, colors, fabric, pattern, style, measurements, personalization, buttons]);

  const onSave = () => {
    localStorage.setItem('tailorDesign', JSON.stringify(summary));
  };

  if (showReview) {
    return (
      <ReviewPage
        garment={garment}
        colors={colors}
        fabric={fabric}
        pattern={pattern}
        style={style}
        measurements={measurements}
        personalization={personalization}
        designImage={designImage}
        notes={notes}
        onBack={() => setShowReview(false)}
        onSubmit={() => alert('Order Submitted!')}
      />
    );
  }

  return (
    <div className="app">
      <div className="nav">
        <button className={garment.startsWith('coat') ? 'active' : ''} onClick={() => setGarment('coat-men')}>Blazer</button>
        <button className={garment === 'barong' ? 'active' : ''} onClick={() => setGarment('barong')}>Barong</button>
        <button className={garment.startsWith('suit') ? 'active' : ''} onClick={() => setGarment('suit-1')}>Suit</button>
        <button className={garment === 'pants' ? 'active' : ''} onClick={() => setGarment('pants')}>Pants</button>
      </div>
      <div className="panel">
        <CustomizationPanel
          garment={garment}
          setGarment={setGarment}
          size={size}
          setSize={setSize}
          fit={fit}
          setFit={setFit}
          colors={colors}
          setColors={setColors}
          fabric={fabric}
          setFabric={setFabric}
          patterns={patterns}
          pattern={pattern}
          setPattern={setPattern}
          fabrics={fabrics}
          designImage={designImage}
          setDesignImage={setDesignImage}
          notes={notes}
          setNotes={setNotes}
          buttons={buttons}
          setButtons={setButtons}
          pantsType={pantsType}
          setPantsType={setPantsType}
          onReview={() => setShowReview(true)}
        />
        <div className="summary">
          <div>Garment: {garment}</div>
          <div>Fabric: {fabric} | Pattern: {pattern}</div>
          <div>Colors: fabric {colors.fabric}, lining {colors.lining}, button {colors.button}, stitching {colors.stitching}</div>
        </div>
      </div>
      <div className="viewer">
        <Viewer3D
          garment={garment}
          size={size}
          fit={fit}
          colors={colors}
          fabric={fabric}
          pattern={pattern}
          style={style}
          measurements={measurements}
          personalization={personalization}
          buttons={buttons}
          setButtons={setButtons}
          pantsType={pantsType}
        />
      </div>
    </div>
  );
}
