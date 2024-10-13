const allPosts = [
    { id: 1, title: 'Frontend Developer Needed', category: 'Development', brand:'apple', description: 'We are looking for a frontend developer with React.js experience.' },
    { id: 2, title: 'Graphic Designer for Social Media', category: 'Design', brand:'samsung', description: 'We need a graphic designer to work on social media posts.' },
    { id: 3, title: 'Marketing Manager for New Campaign', category: 'Marketing', brand:'7-11', description: 'Looking for an experienced marketing manager for a new campaign.' },
    { id: 4, title: 'Backend Developer for API Integration', category: 'Development', brand:'pepsi', description: 'Looking for a backend developer to integrate third-party APIs.' },
    { id: 5, title: 'UI/UX Designer', category: 'Design', brand:'apple', description: 'We need a UI/UX designer to redesign our application.' },
  ];

const onSearch = (value) => {
    const filtered = allPosts.filter(el =>  el.title.toLowerCase().includes(value.toLowerCase()) && (selectedTags.length === 0 || selectedTags.includes(post.category))
    );

    return filtered
  };
