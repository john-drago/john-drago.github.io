/***** boot *****/ // run once the DOM exists so we can find targets
document.addEventListener('DOMContentLoaded', () => { // wait for markup
  bindScrollProgress();   // sets a scroll listener and initializes the bar
  writeYear();            // fills the footer year span
  renderProjects();       // builds project rows from the list below
});

/***** scroll progress *****/ // single place for this behavior
function bindScrollProgress() { // updates the green bar width on scroll
  const bar = document.getElementById('scrollBar'); // the thin bar under the header
  if (!bar) return; // nothing to do if it’s missing

  function onScroll() { // compute how far we’ve scrolled
    const doc = document.documentElement; // root node for measurements
    const y = document.body.scrollTop || doc.scrollTop; // vertical offset
    const max = doc.scrollHeight - doc.clientHeight; // total scrollable distance
    const pct = max > 0 ? (y / max) * 100 : 0; // avoid divide-by-zero on very short pages
    bar.style.width = pct + '%'; // set width as a percentage string
  }

  // safer than assigning window.onscroll
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // initialize at load
}

/***** footer year *****/ // tiny helper so HTML stays clean
function writeYear() { // writes current year into the footer span
  const el = document.getElementById('currentYear'); // target span
  if (el) el.textContent = new Date().getFullYear(); // insert 4-digit year
}

/***** project data *****/ // edit this list to add or change projects
// Each item describes one row. Keep class names exactly as in your CSS to preserve the look.
// NOTE: 'works' (preferred) supports entries WITH or WITHOUT href; 'products' also works.
// Legacy 'links' still supported for backward compatibility.
const PROJECTS = [ // top-to-bottom order on the page

  { // Ritz Adjoint Method for MRI Excitation Pulse Design — Magnetic Resonance group
    group: 'mr_pigs', // which section container (see index.html div ids)
    rowClass: 'ritz', // explicit row class (more robust than inferring from imgClass)
    imgSrc: './assets/images/ritz-adjoint-convergence.png',
    imgAlt: 'Ritz adjoint convergence diagram',
    imgClass: 'ritz_img',
    titleHTML: 'Ritz Adjoint Method for MRI Excitation Pulse Design',
    descHTML:
      'To enable rapid arbitrary waveform pulse design, I developed the Ritz adjoint method for MRI excitation pulses. This approach leverages global basis functions such as Chebyshev polynomials to reduce the number of optimization variables during pulse optimization and improve convergence. The method enables near real-time pulse optimization at the scanner, unlocking the potential of high-field MRI for flexible, patient-specific applications.',
    works: [
      { href: 'https://archive.ismrm.org/2025/4416.html', label: '[ Abstract ]', cls: 'abstract_link' },
      { href: 'https://github.com/john-drago/adjoint-MRI', label: '[ GitHub ]', cls: 'abstract_link' },
      { br: true },
      { label: '[ Manuscript Under Review ]' } // no href → muted text
    ]
  },

  { // Multiphoton Parallel Transmission — Magnetic Resonance group
    group: 'mr_pigs',
    rowClass: 'mpptx_method',
    imgSrc: './assets/images/mpptx-diagram.png',
    imgAlt: 'MP-pTx method diagram',
    imgClass: 'mpptx_method_img',
    titleHTML: 'Development and Characterization of Multiphoton Parallel Transmission (MP-pTx) Excitation Method',
    descHTML:
      'To address flip angle inhomogeneities in high-field MRI without relying on expensive multichannel transmit arrays, we developed and characterized the Multiphoton Parallel Transmission (MP-pTx) method. By leveraging the multiphoton excitation phenomenon, MP-pTx supplements a standard birdcage coil with low-frequency parallel channels around the head to correct flip angle inhomogeneities. The technique was extended to support both high-flip angle regimes and universal pulse design, broadening its applicability across different imaging contexts.',
    works: [
      { href: 'https://archive.ismrm.org/2023/4416.html', label: '[ Abstract 1 ]', cls: 'abstract_link' },
      { href: 'https://archive.ismrm.org/2024/0524.html', label: '[ Abstract 2 ]', cls: 'abstract_link' },
      { br: true },
      { href: 'https://onlinelibrary.wiley.com/doi/10.1002/mrm.30116', label: '[ Manuscript ]', cls: 'abstract_link' },
      { href: 'https://github.com/john-drago/MP-pTx-STA', label: '[ GitHub ]', cls: 'abstract_link' }
    ]
  },

  { // Universal Coil Design for Multiphoton Parallel Transmission — Magnetic Resonance group
    group: 'mr_pigs',
    rowClass: 'mpptx_coil',
    imgSrc: './assets/images/mpptx-universal-coil.png',
    imgAlt: 'MP-pTx universal coil diagram',
    imgClass: 'mpptx_coil_img',
    titleHTML: 'Universal Coil Design for Multiphoton Parallel Transmission',
    descHTML:
      'Rather than deploying a multichannel shim array for MP-pTx, we designed a single, low frequency, “universal” transmit coil capable of mitigating flip angle inhomogeneities across a population database. Coil optimization was performed with boundary element methods to determine optimal winding patterns, in conjunction with joint optimization of a universal excitation pulse. This integrated design provides a simplified and scalable approach to parallel transmission.',
    works: [
      { href: 'https://archive.ismrm.org/2024/0671.html', label: '[ Abstract ]', cls: 'abstract_link' },
      { label: '[ Manuscript in progress ]' }
    ]
  },

  { // MPI team — Magnetic Resonance group
    group: 'mr_pigs',
    rowClass: 'mpi',
    imgSrc: './assets/images/mpi-macaque-cnr.png',
    imgAlt: 'MPI macaque CNR figure',
    imgClass: 'mpi_img',
    titleHTML: 'Functional Neuroimaging with Magnetic Particle Imaging',
    descHTML:
      'I contributed to the development of hardware and software enabling functional magnetic particle imaging (MPI) for neuroimaging. My work included characterizing hemodynamic sensitivity in animal models, designing transmit filter topologies to suppress harmonic distortion, and statistically evaluating time-series image data. Together, these efforts advanced MPI toward quantitative functional brain imaging.',
    works: [
      { href: 'https://journal.iwmpi.org/index.php/iwmpi/article/view/846', label: '[ Conference Proceedings 1 ]', cls: 'abstract_link' },
      { href: 'https://journal.iwmpi.org/index.php/iwmpi/article/view/458', label: '[ Conference Proceedings 2 ]', cls: 'abstract_link' },
      { br: true },
      { href: 'https://journal.iwmpi.org/index.php/iwmpi/article/view/452', label: '[ Conference Proceedings 3 ]', cls: 'abstract_link' },
      { href: 'https://journal.iwmpi.org/index.php/iwmpi/article/view/407', label: '[ Conference Proceedings 4 ]', cls: 'abstract_link' },
      { br: true },
      { href: 'https://journal.iwmpi.org/index.php/iwmpi/article/view/483', label: '[ Manuscript 1 ]', cls: 'abstract_link' },
      { href: 'https://iopscience.iop.org/article/10.1088/1361-6560/acecd1', label: '[ Manuscript 2 ]', cls: 'abstract_link' }
    ]
  },

  { // Kinematics — Bioengineering group
    group: 'bioengineering_lab',
    rowClass: 'kinematics',
    imgSrc: './assets/images/kinematics.png',
    imgAlt: 'Knee kinematics visualization',
    imgClass: 'kinematics_img',
    titleHTML: 'Determining <i class="ital_par">In Vivo</i> Kinematics of Novel Knee Replacement Designs',
    descHTML:
      'Using dual-plane fluoroscopy in combination with 3D meshes reconstructed from CT scans of native knees, we quantified precise <i class="ital_par">in vivo</i> 3D joint kinematics. This framework allowed us to compare the motion of novel knee replacement designs against that of the native knee, providing insight into how implant geometry influences joint function.',
    works: [
      { href: 'https://www.ors.org/transactions/65/0896.pdf', label: '[ Abstract 1 ]', cls: 'abstract_link' },
      { href: 'https://www.ors.org/transactions/65/1762.pdf', label: '[ Abstract 2 ]', cls: 'abstract_link' },
      { href: 'https://www.ors.org/transactions/65/0905.pdf', label: '[ Abstract 3 ]', cls: 'abstract_link' },
      { href: 'https://www.ors.org/transactions/65/0952.pdf', label: '[ Abstract 4 ]', cls: 'abstract_link' },
      { br: true },
      { href: 'https://www.ors.org/transactions/65/0984.pdf', label: '[ Abstract 5 ]', cls: 'abstract_link' },
      { href: 'https://www.ors.org/transactions/65/1842.pdf', label: '[ Abstract 6 ]', cls: 'abstract_link' },
      { href: 'https://www.ors.org/transactions/65/1844.pdf', label: '[ Abstract 7 ]', cls: 'abstract_link' },
      { href: 'https://www.emma.events/site/programme/?1=1&sessiondetail=2562723&abstractdetail=72468&a=efort2019&trackid=0&i=', label: '[ Abstract 8 ]', cls: 'abstract_link' },
      { br: true },
      { href: 'https://www.thieme-connect.com/products/ejournals/abstract/10.1055/s-0040-1718681', label: '[ Manuscript 1 ]', cls: 'abstract_link' },
      { href: 'https://esskajournals.onlinelibrary.wiley.com/doi/10.1007/s00167-020-06384-9', label: '[ Manuscript 2 ]', cls: 'abstract_link' }
    ]
  },

  { // Image Registration — Bioengineering group
    group: 'bioengineering_lab',
    rowClass: 'img_reg',
    imgSrc: './assets/images/image-registration-nn.png',
    imgAlt: 'Neural network image registration diagram',
    imgClass: 'img_reg_img',
    titleHTML: '3D to 2D Image Registration',
    descHTML:
      'I also worked on automating the process of 3D to 2D image registration, which maps three-dimensional anatomical meshes to dual-plane fluoroscopic projections. Using the <a class="inline_link" href="https://www.tensorflow.org/" target="_blank" rel="noopener noreferrer">TensorFlow</a> deep learning framework, I developed models capable of approximating <i class="ital_par">in vivo</i> joint orientations directly from fluoroscopic data, reducing the need for manual alignment.',
    works: [
      { href: 'https://github.com/john-drago/fluoro', label: '[ GitHub ]', cls: 'inline_link' }
    ]
  },

  { // Strain device — Continuum group
    group: 'continuum',
    rowClass: 'strain_device',
    imgSrc: './assets/images/strain-device.jpg',
    imgAlt: 'Polysulfone tendon strain device',
    imgClass: 'strain_device_img',
    titleHTML: 'Applying Strain to Tendon-Bone Constructs',
    descHTML:
      'Recognizing that tendons must remain under strain to maintain homeostatic regulation, I designed and prototyped a polysulfone apparatus capable of applying either static or dynamic strain to incubated tendons. In parallel, I investigated optimal culture media for sustaining explanted tendon growth, helping establish platforms for <i class="ital_par">in vitro</i> studies of tendon mechanobiology.',
    works: [
      { href: 'https://web.archive.org/web/20250921151249/https://submissions.mirasmart.com/SecureView/BMESArchive/radang5bflm.pdf', label: '[ Abstract 1 ]', cls: 'abstract_link' },
      { href: 'https://web.archive.org/web/20250921151150/https://submissions.mirasmart.com/SecureView/BMESArchive/radcolzjo02.pdf', label: '[ Abstract 2 ]', cls: 'abstract_link' }
    ],
    imageHref: './assets/docs/tendon-strain-device-design.pdf' // wrap image in a link (like your original)
  },

  { // Cell signaling — Continuum group
    group: 'continuum',
    rowClass: 'cell_sig',
    imgSrc: './assets/images/cell-signaling-ptoa.png',
    imgAlt: 'Cell signaling diagram for PTOA',
    imgClass: 'cell_sig_img',
    titleHTML: 'Cell-Signaling of Post-Traumatic Osteoarthritis',
    descHTML:
      'Through tandem mass spectrometry, we identified key mediators of cellular signaling pathways involved in cartilage matrix turnover. Leveraging this insight, we selectively inhibited specific mitogen-activated protein kinases, which restored cell biosynthesis and reduced extracellular degradation, offering potential therapeutic strategies for cartilage degeneration.',
    works: [
      { href: 'https://www.oarsijournal.com/article/S1063-4584(17)30331-X/fulltext', label: '[ Abstract ]', cls: 'abstract_link' }
    ]
  }
];

/***** renderer *****/ // builds rows so the output matches original layout
function renderProjects() { // read PROJECTS and append DOM nodes into each group
  // helper: create an element with classes and optional HTML
  const el = (tag, cls, html) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html) n.innerHTML = html;
    return n;
  }; // tiny utility

  // render each project in order
  PROJECTS.forEach(p => { // loop projects from top to bottom
    const mount = document.getElementById(`group-${p.group}`); // find the target container
    if (!mount) return; // skip if the group shell is missing

    // outer row wrapper: use explicit rowClass (fallback keeps original look)
    const row = el('div', p.rowClass || 'img_reg');

    // image element (wrapped in a link when requested)
    const img = el('img', `${p.imgClass} proj_img`); // keep the exact size class + border class
    img.src = p.imgSrc; // image path
    img.alt = p.imgAlt || ''; // alt text

    let left; // node that ends up on the left side
    if (p.imageHref) { // some rows have clickable images
      const a = el('a'); // anchor wrapper
      a.href = p.imageHref; // click target
      a.target = '_blank'; // new tab
      a.rel = 'noopener noreferrer'; // security + privacy
      a.appendChild(img); // put image inside
      left = a; // mount this on the left
    } else {
      left = img; // plain image otherwise
    }
    row.appendChild(left); // add left side

    // right text column
    const right = el('div', 'proj_text'); // keep original class
    right.appendChild(el('p', 'proj_titles', p.titleHTML)); // title line (HTML allowed)
    right.appendChild(el('p', null, p.descHTML)); // description (HTML allowed)

    // works/products/links area (supports items with or without href)
    const works = el('div', 'pub_links'); // same center-aligned container
    const items = p.works || []; // backward-compat chain
    items.forEach(item => { // each link/break/text item
      if (item.br) {
        works.appendChild(document.createElement('br'));
        return;
      }
      if (item.href) {
        const a = el('a', item.cls || 'abstract_link', item.label);
        a.href = item.href;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        works.appendChild(a);
      } else {
        const span = el('span', item.cls || 'absent_link', item.label);
        works.appendChild(span);
      }
      works.appendChild(document.createTextNode(' ')); // small space
    });
    right.appendChild(works); // add block

    row.appendChild(right); // add right column
    mount.appendChild(row); // attach row to group

    // ensure block separation (harmless even with flex)
    mount.appendChild(el('div', 'clearfix')); // row terminator so the next block starts beneath
    mount.appendChild(el('div', 'spacer s56')); // spacing between rows to match original rhythm
  });
}
