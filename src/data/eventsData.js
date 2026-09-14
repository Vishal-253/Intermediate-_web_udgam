export const categories = [
  { id: 'all', label: 'All Arenas', flower: '🌸' },
  { id: 'cultural', label: 'Music & Pronites', flower: '🎵' },
  { id: 'dance', label: 'Dance & Drama', flower: '💃' },
  { id: 'technical', label: 'Tech & Hackathon', flower: '💻' },
  { id: 'arts', label: 'Fine Arts & Fashion', flower: '🎨' },
  { id: 'literary', label: 'Literary & Quizzing', flower: '📜' },
];

export const eventsData = [
  {
    id: 'rhapsody',
    category: 'cultural',
    categoryLabel: 'Pronites & Music',
    prize: '₹60,000 Pool',
    title: 'Rhapsody: Battle of the Bands',
    desc: 'Thunderous drum solos, electric guitar riffs, and soulful vocals. College bands from across the nation battle under the starlit Himalayan sky.',
    date: 'Day 2 • 6:30 PM',
    venue: 'Open Air Amphitheatre',
    teamSize: '3 to 8 Members',
    rules: [
      'Time limit: 20 minutes (including line check & sound check).',
      'Original compositions are strongly rewarded with bonus points.',
      'A full 5-piece drum kit and standard guitar/bass amplifiers will be provided.',
      'Judgment criteria: Tightness, vocal quality, stage presence, and crowd engagement.'
    ]
  },
  {
    id: 'hackthebloom',
    category: 'technical',
    categoryLabel: 'Tech & Hackathon',
    prize: '₹1,00,000 Pool',
    title: 'HackTheBloom: 36h Hackathon',
    desc: 'Harness AI, Web3, and sustainable tech to solve high-impact challenges. Non-stop coding, expert mentorship, API bounties, and startup incubation grants.',
    date: 'Day 1 - 2 • 36 Hours',
    venue: 'Computing Innovation Lab',
    teamSize: '2 to 4 Members',
    rules: [
      'All code, designs, and assets must be crafted exclusively during the 36-hour sprint.',
      'Use of open-source frameworks and public APIs is welcome.',
      'Top 10 teams qualify for the Day 3 Grand Pitching Arena before angel investors.',
      'Round-the-clock refreshments, high-speed WiFi, and rest lounges provided.'
    ]
  },
  {
    id: 'nrityanjali',
    category: 'dance',
    categoryLabel: 'Dance & Drama',
    prize: '₹45,000 Pool',
    title: 'Nrityanjali: Choreonite',
    desc: 'Synchronized poetry in motion. Classical grace, contemporary lyrical fusion, and high-octane hip-hop crews compete for the coveted golden trophy.',
    date: 'Day 2 • 2:00 PM',
    venue: 'Main Auditorium',
    teamSize: '8 to 25 Members',
    rules: [
      'Performance duration: 8 to 12 minutes.',
      'Soundtracks must be submitted in MP3 format 4 hours prior to the event.',
      'Props permitted with prior notification to stage managers.',
      'Judging parameters: Synchronization, choreography, costumes, expression, and energy.'
    ]
  },
  {
    id: 'vogue',
    category: 'arts',
    categoryLabel: 'Fine Arts & Fashion',
    prize: '₹50,000 Pool',
    title: 'Vogue Vista: The Sakura Runway',
    desc: 'Haute couture meets fairy-tale aesthetics. Daring silhouettes, botanical textiles, and ethereal runway presence under illuminated cherry blossom arches.',
    date: 'Day 3 • 5:00 PM',
    venue: 'Central Courtyard',
    teamSize: '10 to 18 Models & Stylists',
    rules: [
      'Theme: "Whimsical Blossoms" or "Futuristic Organic Couture".',
      'Sequence time: 10 to 14 minutes per college.',
      'Garments must demonstrate ethical sourcing or innovative wearable art.',
      'Professional lighting and sound engineering provided by fest committee.'
    ]
  },
  {
    id: 'roboclash',
    category: 'technical',
    categoryLabel: 'Tech & Robotics',
    prize: '₹40,000 Pool',
    title: 'RoboClash: Autonomous Arena',
    desc: 'High-torque bots clash in an obstacle-laden terrain. Line followers, obstacle avoidance, and mechanized combat designed by India’s brightest engineers.',
    date: 'Day 1 • 11:00 AM',
    venue: 'Mechanical Workshop Hall',
    teamSize: '2 to 4 Members',
    rules: [
      'Max bot dimensions: 30cm x 30cm x 30cm, Max weight: 3.5 kg.',
      'Power supply on-board must not exceed 24V DC.',
      'Two phases: Phase 1 (Autonomous Line & Maze), Phase 2 (Obstacle Blitz).',
      'Fair play strictly enforced; jamming devices lead to disqualification.'
    ]
  },
  {
    id: 'poetry',
    category: 'literary',
    categoryLabel: 'Literary & Quiz',
    prize: '₹25,000 Pool',
    title: 'Echoes of Spring: Poetry Slam',
    desc: 'Spoken word poetry, bilingual verse (Hindi, English, Nepali), and parliamentary debating that touches the strings of social conscience and beauty.',
    date: 'Day 1 • 3:00 PM',
    venue: 'Conference Hall Alpha',
    teamSize: 'Individual Solo Entry',
    rules: [
      'Time limit: 4 minutes per poet + 30-second grace period.',
      'Poems must be original works of the contestant.',
      'No musical instruments or props; pure voice and gesture.',
      'Judged on wordcraft, emotional resonance, tempo, and vocal projection.'
    ]
  },
  {
    id: 'cosplay',
    category: 'arts',
    categoryLabel: 'Fine Arts & Cosplay',
    prize: '₹35,000 Pool',
    title: 'Matsuri Cosplay & Comic Con',
    desc: 'Step into your beloved anime, fantasy, and pop-culture characters. Costume craftmanship, in-character monologues, and artist alley showcase.',
    date: 'Day 2 • 4:00 PM',
    venue: 'Pine Grove Stage',
    teamSize: 'Solo or Duo Entry',
    rules: [
      'Cosplay must be at least 60% crafted or self-altered.',
      '1-minute stage skit / character walk with dedicated audio cue.',
      'All weapons must be peace-bonded and blunt (foam, wood, or 3D printed).',
      'Special awards for Best Craftsmanship, Best Performance, and Crowd Favorite.'
    ]
  },
  {
    id: 'pronite',
    category: 'cultural',
    categoryLabel: 'Grand Pronite',
    prize: 'Mega Stage',
    title: 'The Grand Bloom: Celebrity Star Night',
    desc: 'The crescendo of Udgam 2026! Top Bollywood artist & EDM sensation setting the stage ablaze with laser shows, confetti blossoms, and unbridled euphoria.',
    date: 'Day 3 • 7:30 PM',
    venue: 'Main Festival Grounds',
    teamSize: 'All Delegate Pass Holders',
    rules: [
      'Valid festival wristband / digital pass required at stadium turnstiles.',
      'Gates open at 6:00 PM. VIP pass holders enter via Express Gate 1.',
      'Prohibited items: Glass bottles, laser pointers, outside food.',
      'Emergency medical tents and water stations situated throughout grounds.'
    ]
  }
];
