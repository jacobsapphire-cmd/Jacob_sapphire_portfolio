// ============================================================
//  PORTFOLIO DATA — All content lives here. Edit this file
//  to update the site. Components never hardcode strings.
// ============================================================
const portfolioData = {

  profile: {
    name:      "Jacob Sapphire J C",
    shortName: "Jacob",
    roles: [
      "GIS Analyst",
      "AI Developer",
      "Web Developer",
      "M.Sc. Applied Geography"
    ],
    bio: "GIS Analyst & AI Developer with hands-on experience in spatial analysis, morphometric studies, data visualization and automation using AI and Python. I transform geospatial data into actionable insights, interactive dashboards, and web applications.",
    photo: "IMG_20241015_191844.jpg",
    cv:    "Jacob_Sapphire_CV.pdf",
    social: {
      email:    "Sapphireajs@gmail.com",
      phone:    "+91 93846 30838",
      phoneTel: "+919384630838",
      whatsapp: "https://wa.me/919384630838",
      linkedin: "https://www.linkedin.com/in/jacob-sapphire-4657a327a"
    }
  },

  // ── Experience & Education for the timeline ──────────────
  timeline: [
    {
      type:    "work",
      period:  "May – July 2024",
      role:    "GIS Intern",
      company: "KSCSTE NATPAC, Kerala",
      highlights: [
        "Spatio-temporal crash analysis with hotspot detection & KDE",
        "3D space-time cube modeling on 2021–2023 Kerala Police data",
        "Created police jurisdiction boundaries for road safety planning",
        "IDW interpolation & spatial autocorrelation analysis"
      ]
    },
    {
      type:    "edu",
      period:  "2023 – 2025",
      role:    "M.Sc. Applied Geography",
      company: "University of Madras",
      highlights: [
        "PG Project: GIS-Based Morphometric Analysis of Agniyar River Basin",
        "First Blender 3D terrain visualization in PG Geography at the university"
      ]
    },
    {
      type:    "work",
      period:  "Jun – Aug 2022",
      role:    "GIS Intern",
      company: "MAPe IT Solutions Pvt. Ltd., Chennai",
      highlights: [
        "Digitized ~377 buildings with footprints & height attributes",
        "3D building vectorization using Google Earth Pro, QGIS & ArcMap",
        "ArcGIS Toolbox: 3D Analyst, Spatial Statistics, Data Management"
      ]
    },
    {
      type:    "edu",
      period:  "2020 – 2023",
      role:    "B.Sc. Geography",
      company: "Madras Christian College",
      highlights: []
    }
  ],

  // ── Skills ───────────────────────────────────────────────
  skills: {
    technical: [
      { name: "ArcGIS Pro",    logo: "logos/arcgis.png",   level: 90 },
      { name: "MS Office",     logo: "logos/ms.png",       level: 90 },
      { name: "Erdas Imagine", logo: "logos/erdas.png",    level: 85 },
      { name: "Adobe Suite",   logo: "logos/adobe.png",    level: 85 },
      { name: "QGIS",          logo: "logos/qgis.png",     level: 80 },
      { name: "Blender 3D",    logo: "logos/blender.png",  level: 80 },
      { name: "Python",        logo: "logos/python.png",   level: 75 },
      { name: "Visual Studio", logo: "logos/vs.png",       level: 75 },
      { name: "Figma",         logo: "logos/figma.png",    level: 70 }
    ],
    professional: [
      { name: "Resilience",       percent: 85 },
      { name: "Communication",    percent: 85 },
      { name: "Adaptability",     percent: 80 },
      { name: "Decision Making",  percent: 70 }
    ]
  },

  // ── Projects ─────────────────────────────────────────────
  projects: [
    {
      id:          "morphometric",
      label:       "PG Project",
      title:       "Morphometric Analysis of Agniyar River Basin",
      subtitle:    "GIS · Remote Sensing · Blender 3D",
      description: "Comprehensive GIS-based morphometric analysis using SRTM DEM in ArcGIS Pro & QGIS. Computed linear, areal, and relief parameters to assess runoff potential and erosion risk. Featured the first-ever 3D Blender terrain visualization for a PG Geography project at University of Madras.",
      stack:       ["ArcGIS Pro", "QGIS", "Blender 3D", "SRTM DEM", "Excel"],
      video:       "morphometric_demo.mp4",
      pdf:         "Morphometric_Analysis_Jacob.pdf",
      link:        null
    },
    {
      id:          "ai-bg-remover",
      label:       "Live App",
      title:       "AI Background Remover",
      subtitle:    "Python · Flask · U-2-Net · Render Cloud",
      description: "Live AI-powered web application that automatically removes image backgrounds using the U-2-Net deep learning model. Drag-and-drop interface, transparent PNG export, deployed on Render Cloud.",
      stack:       ["Python", "Flask", "U-2-Net", "HTML/CSS/JS", "Render Cloud"],
      video:       "AI_sample_vid",
      pdf:         null,
      link:        "https://jacobbay-ai-background-remover.onrender.com"
    },
    {
      id:          "kerala-crash",
      label:       "Internship",
      title:       "Road Crash Hotspot Detection — Kerala",
      subtitle:    "ArcGIS Pro · Space-Time Cube · KDE",
      description: "Spatio-temporal hotspot analysis of Kerala road crashes using Kernel Density Estimation, Space-Time Cube modeling, and IDW interpolation on 2021–2023 accident data from Kerala Police.",
      stack:       ["ArcGIS Pro", "Space-Time Cube", "KDE", "IDW", "Excel"],
      video:       "space_time_cube.mp4",
      pdf:         "kerala_crash_study.pdf",
      link:        null
    },
    {
      id:          "dam-safety",
      label:       "AI Platform",
      title:       "Dam Flood Modelling & Safety Decision Support System",
      subtitle:    "",
      description: "A professional-grade AI platform for real-time dam safety monitoring and flood simulation. Empowers emergency responders with live hydrological data integration, interactive 3D hazard mapping, and intelligent spillway release optimization.",
      stack:       ["FastAPI", "React 18", "TypeScript", "CesiumJS", "CUDA"],
      video:       null,
      pdf:         null,
      link:        null
    },
    {
      id:          "coastal-risk",
      label:       "Disaster Management",
      title:       "Coastal Disaster Risk Analyser",
      subtitle:    "",
      description: "Advanced web application for coastal emergency management and climate resilience planning. Visualizes hurricane storm surges, sea-level rise scenarios, and coordinates response through an immersive 3D globe with evacuation routing and drone monitoring.",
      stack:       ["FastAPI", "React", "TypeScript", "CesiumJS", "Leaflet"],
      video:       null,
      pdf:         null,
      link:        null
    }

  ]
};
