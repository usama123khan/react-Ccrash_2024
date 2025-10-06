import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import JobsPage from './pages/JobsPage';
import NotFoundPage from './pages/NotFoundPage';
import JobPage, { jobLoader } from './pages/JobPage';
import AddJobPage from './pages/AddJobPage';
import EditJobPage from './pages/EditJobPage';
import JobsTableViewPage from './pages/JobsTableViewPage';

// Mock data - 25 jobs
const initialJobs = [
  {
    "id": "1",
    "title": "Senior React Developer",
    "type": "Full-Time",
    "description": "We are seeking a talented Front-End Developer to join our team in Boston, MA. The ideal candidate will have strong skills in HTML, CSS, and JavaScript, with experience working with modern JavaScript frameworks such as React or Angular.",
    "location": "Boston, MA",
    "salary": "$70K - $80K",
    "company": {
      "name": "NewTek Solutions",
      "description": "NewTek Solutions is a leading technology company specializing in web development and digital solutions.",
      "contactEmail": "contact@teksolutions.com",
      "contactPhone": "555-555-5555"
    }
  },
  {
    "id": "2",
    "title": "Front-End Engineer (React & Redux)",
    "type": "Full-Time",
    "location": "Miami, FL",
    "description": "Join our team as a Front-End Developer in sunny Miami, FL. We are looking for a motivated individual with a passion for crafting beautiful and responsive web applications.",
    "salary": "$70K - $80K",
    "company": {
      "name": "Veneer Solutions",
      "description": "Veneer Solutions is a creative agency specializing in digital design and development.",
      "contactEmail": "contact@veneer.com",
      "contactPhone": "555-555-5555"
    }
  },
  {
    "id": "3",
    "title": "React.js Developer",
    "type": "Full-Time",
    "location": "Brooklyn, NY",
    "description": "Are you passionate about front-end development? Join our team in vibrant Brooklyn, NY, and work on exciting projects that make a difference.",
    "salary": "$75K - $85K",
    "company": {
      "name": "Dolor Cloud",
      "description": "Dolor Cloud is a leading technology company specializing in digital solutions for businesses of all sizes.",
      "contactEmail": "contact@dolorcloud.com",
      "contactPhone": "555-555-5556"
    }
  },
  {
    "id": "4",
    "title": "React Front-End Developer",
    "type": "Part-Time",
    "description": "Join our team as a Part-Time Front-End Developer in beautiful Phoenix, AZ. We are looking for a self-motivated individual with a passion for creating engaging user experiences.",
    "location": "Phoenix, AZ",
    "salary": "$60K - $70K",
    "company": {
      "name": "Alpha Elite",
      "description": "Alpha Elite is a dynamic startup specializing in digital marketing and web development.",
      "contactEmail": "contact@alphaelite.com",
      "contactPhone": "555-555-5557"
    }
  },
  {
    "id": "5",
    "title": "Full Stack React Developer",
    "type": "Full-Time",
    "description": "Exciting opportunity for a Full-Time Front-End Developer in bustling Atlanta, GA. We are seeking a talented individual with a passion for building elegant and scalable web applications.",
    "location": "Atlanta, GA",
    "salary": "$90K - $100K",
    "company": {
      "name": "Browning Technologies",
      "description": "Browning Technologies is a rapidly growing technology company specializing in e-commerce solutions.",
      "contactEmail": "contact@browningtech.com",
      "contactPhone": "555-555-5558"
    }
  },
  {
    "id": "6",
    "title": "React Native Developer",
    "type": "Full-Time",
    "description": "Join our team as a Front-End Developer in beautiful Portland, OR. We are looking for a skilled and enthusiastic individual to help us create innovative web solutions.",
    "location": "Portland, OR",
    "salary": "$100K - $110K",
    "company": {
      "name": "Port Solutions INC",
      "description": "Port Solutions is a leading technology company specializing in software development and digital marketing.",
      "contactEmail": "contact@portsolutions.com",
      "contactPhone": "555-555-5559"
    }
  },
  {
    "id": "7",
    "title": "UI/UX React Engineer",
    "type": "Full-Time",
    "description": "Design and build intuitive user interfaces with React. Work closely with designers and product managers to deliver seamless experiences.",
    "location": "Seattle, WA",
    "salary": "$85K - $95K",
    "company": {
      "name": "BlueWave Digital",
      "description": "BlueWave Digital focuses on creating engaging web and mobile solutions for startups and enterprises worldwide.",
      "contactEmail": "careers@bluewave.com",
      "contactPhone": "555-555-1111"
    }
  },
  {
    "id": "8",
    "title": "React Front-End Engineer",
    "type": "Remote",
    "description": "6-month contract to develop responsive web applications with React, TypeScript, and Material-UI.",
    "location": "Remote",
    "salary": "$60K - $70K",
    "company": {
      "name": "TechBridge LLC",
      "description": "TechBridge provides cutting-edge digital solutions to mid-size businesses and enterprises.",
      "contactEmail": "jobs@techbridge.com",
      "contactPhone": "555-555-2222"
    }
  },
  {
    "id": "9",
    "title": "Junior React Developer",
    "type": "Full-Time",
    "description": "Great entry-level opportunity to work with a senior team on building modern React applications.",
    "location": "Denver, CO",
    "salary": "$55K - $65K",
    "company": {
      "name": "NextGen Labs",
      "description": "NextGen Labs specializes in innovative web solutions for education and healthcare industries.",
      "contactEmail": "hr@nextgenlabs.io",
      "contactPhone": "555-555-3333"
    }
  },
  {
    "id": "10",
    "title": "Senior Front-End Engineer",
    "type": "Full-Time",
    "description": "Lead front-end projects using React and Redux, mentor junior developers, and collaborate with cross-functional teams.",
    "location": "San Francisco, CA",
    "salary": "$120K - $140K",
    "company": {
      "name": "BrightSpark Technologies",
      "description": "BrightSpark delivers high-performance web platforms for fintech and SaaS startups.",
      "contactEmail": "careers@brightspark.io",
      "contactPhone": "555-555-4444"
    }
  },
  {
    "id": "11",
    "title": "React + Node.js Full Stack Developer",
    "type": "Full-Time",
    "description": "Build and maintain scalable full-stack applications with React on the front end and Node.js on the back end.",
    "location": "Chicago, IL",
    "salary": "$95K - $110K",
    "company": {
      "name": "UrbanTech Solutions",
      "description": "UrbanTech specializes in urban mobility and smart city solutions using cutting-edge technologies.",
      "contactEmail": "joinus@urbantech.com",
      "contactPhone": "555-555-5556"
    }
  },
  {
    "id": "12",
    "title": "React Native Mobile Engineer",
    "type": "Full-Time",
    "description": "Develop cross-platform mobile apps using React Native for iOS and Android platforms.",
    "location": "Los Angeles, CA",
    "salary": "$100K - $120K",
    "company": {
      "name": "AppCore Studio",
      "description": "AppCore Studio focuses on high-quality mobile application development for global clients.",
      "contactEmail": "work@appcorestudio.com",
      "contactPhone": "555-555-5557"
    }
  },
  {
    "id": "13",
    "title": "Front-End React Contractor",
    "type": "Remote",
    "description": "Short-term contract role to create dashboards and analytics pages with React and Chart.js.",
    "location": "Remote",
    "salary": "$65K - $75K",
    "company": {
      "name": "DataViz Pro",
      "description": "DataViz Pro provides advanced data visualization and analytics tools for enterprise customers.",
      "contactEmail": "contracts@datavizpro.com",
      "contactPhone": "555-555-5558"
    }
  },
  {
    "id": "14",
    "title": "React Performance Engineer",
    "type": "Full-Time",
    "description": "Optimize React applications for speed and scalability, implementing best practices for performance.",
    "location": "Austin, TX",
    "salary": "$105K - $115K",
    "company": {
      "name": "SwiftTech Systems",
      "description": "SwiftTech is dedicated to building fast, scalable, and secure web platforms for finance and healthcare.",
      "contactEmail": "hiring@swifttech.com",
      "contactPhone": "555-555-5559"
    }
  },
  {
    "id": "15",
    "title": "React UI Engineer",
    "type": "Full-Time",
    "description": "Collaborate with designers to translate Figma mockups into responsive React components.",
    "location": "Boston, MA",
    "salary": "$80K - $90K",
    "company": {
      "name": "PixelWorks",
      "description": "PixelWorks creates beautiful, high-quality UI experiences for web and mobile applications.",
      "contactEmail": "jobs@pixelworks.com",
      "contactPhone": "555-555-5560"
    }
  },
  {
    "id": "16",
    "title": "React Developer Intern",
    "type": "Internship",
    "description": "Great opportunity for a motivated student or recent graduate to gain hands-on experience with React development.",
    "location": "Remote",
    "salary": "Under $50K",
    "company": {
      "name": "InnovateX",
      "description": "InnovateX helps startups rapidly build MVPs and scale their web platforms.",
      "contactEmail": "internships@innovatex.com",
      "contactPhone": "555-555-5561"
    }
  },
  {
    "id": "17",
    "title": "Lead React Developer",
    "type": "Full-Time",
    "description": "Lead a team of developers building enterprise-level React applications with modern architecture patterns.",
    "location": "New York, NY",
    "salary": "$130K - $150K",
    "company": {
      "name": "Enterprise Solutions Inc",
      "description": "Enterprise Solutions provides scalable web applications for Fortune 500 companies.",
      "contactEmail": "careers@enterprisesol.com",
      "contactPhone": "555-555-6001"
    }
  },
  {
    "id": "18",
    "title": "React TypeScript Developer",
    "type": "Full-Time",
    "description": "Build type-safe React applications using TypeScript, focusing on maintainable and scalable code architecture.",
    "location": "Dallas, TX",
    "salary": "$85K - $100K",
    "company": {
      "name": "TypeSafe Solutions",
      "description": "TypeSafe Solutions specializes in building robust applications with modern TypeScript and React.",
      "contactEmail": "jobs@typesafe.com",
      "contactPhone": "555-555-6002"
    }
  },
  {
    "id": "19",
    "title": "React E-commerce Developer",
    "type": "Full-Time",
    "description": "Develop and maintain e-commerce platforms using React, Redux, and modern payment integration systems.",
    "location": "Las Vegas, NV",
    "salary": "$75K - $90K",
    "company": {
      "name": "ShopFlow Technologies",
      "description": "ShopFlow creates cutting-edge e-commerce solutions for retail businesses worldwide.",
      "contactEmail": "hiring@shopflow.com",
      "contactPhone": "555-555-6003"
    }
  },
  {
    "id": "20",
    "title": "React GraphQL Developer",
    "type": "Full-Time",
    "description": "Build modern React applications with GraphQL APIs, focusing on efficient data fetching and state management.",
    "location": "Minneapolis, MN",
    "salary": "$90K - $105K",
    "company": {
      "name": "GraphQL Systems",
      "description": "GraphQL Systems builds next-generation APIs and front-end applications for data-driven companies.",
      "contactEmail": "careers@graphqlsys.com",
      "contactPhone": "555-555-6004"
    }
  },
  {
    "id": "21",
    "title": "React Testing Specialist",
    "type": "Full-Time",
    "description": "Implement comprehensive testing strategies for React applications using Jest, Testing Library, and Cypress.",
    "location": "Salt Lake City, UT",
    "salary": "$70K - $85K",
    "company": {
      "name": "QualityFirst Tech",
      "description": "QualityFirst Tech focuses on building reliable, well-tested software solutions for healthcare and finance.",
      "contactEmail": "jobs@qualityfirst.com",
      "contactPhone": "555-555-6005"
    }
  },
  {
    "id": "22",
    "title": "React DevOps Engineer",
    "type": "Full-Time",
    "description": "Bridge development and operations by building CI/CD pipelines for React applications and managing deployment infrastructure.",
    "location": "Phoenix, AZ",
    "salary": "$95K - $110K",
    "company": {
      "name": "DevOps Dynamics",
      "description": "DevOps Dynamics specializes in streamlining development workflows and cloud infrastructure management.",
      "contactEmail": "hiring@devopsdynamics.com",
      "contactPhone": "555-555-6006"
    }
  },
  {
    "id": "23",
    "title": "React Accessibility Engineer",
    "type": "Full-Time",
    "description": "Ensure React applications meet WCAG guidelines and provide excellent user experiences for users with disabilities.",
    "location": "Portland, OR",
    "salary": "$80K - $95K",
    "company": {
      "name": "AccessibleWeb Solutions",
      "description": "AccessibleWeb Solutions creates inclusive web applications that work for everyone, regardless of ability.",
      "contactEmail": "careers@accessibleweb.com",
      "contactPhone": "555-555-6007"
    }
  },
  {
    "id": "24",
    "title": "React Micro-frontends Developer",
    "type": "Full-Time",
    "description": "Build scalable micro-frontend architectures using React and modern module federation techniques.",
    "location": "Tampa, FL",
    "salary": "$100K - $120K",
    "company": {
      "name": "MicroArch Systems",
      "description": "MicroArch Systems pioneers micro-frontend architectures for large-scale enterprise applications.",
      "contactEmail": "jobs@microarch.com",
      "contactPhone": "555-555-6008"
    }
  },
  {
    "id": "25",
    "title": "React Security Engineer",
    "type": "Full-Time",
    "description": "Focus on security best practices for React applications, including authentication, authorization, and vulnerability assessment.",
    "location": "Washington, DC",
    "salary": "$110K - $130K",
    "company": {
      "name": "SecureReact Corp",
      "description": "SecureReact Corp specializes in building security-first React applications for government and enterprise clients.",
      "contactEmail": "security@securereact.com",
      "contactPhone": "555-555-6009"
    }
  }
];

// Initialize localStorage with mock data (force update)
localStorage.setItem('jobs', JSON.stringify(initialJobs));

const App = () => {
  // Get jobs from localStorage
  const getJobs = () => {
    const jobs = localStorage.getItem('jobs');
    return jobs ? JSON.parse(jobs) : [];
  };

  // Save jobs to localStorage
  const saveJobs = (jobs) => {
    localStorage.setItem('jobs', JSON.stringify(jobs));
  };

  // Add New Job
  const addJob = async (newJob) => {
    console.log('Adding job:', newJob);
    
    try {
      const jobs = getJobs();
      const newId = (Math.max(...jobs.map(job => parseInt(job.id))) + 1).toString();
      const jobWithId = { ...newJob, id: newId };
      
      const updatedJobs = [...jobs, jobWithId];
      saveJobs(updatedJobs);
      
      console.log('Job added successfully:', jobWithId);
      return jobWithId;
    } catch (error) {
      console.error('Error adding job:', error);
      throw error;
    }
  };

  // Delete Job
  const deleteJob = async (id) => {
    console.log('Deleting job with ID:', id);
    
    try {
      const jobs = getJobs();
      const updatedJobs = jobs.filter(job => job.id !== id);
      saveJobs(updatedJobs);
      
      console.log('Job deleted successfully');
      return true;
    } catch (error) {
      console.error('Delete Error:', error);
      throw error;
    }
  };

  // Update Job
  const updateJob = async (updatedJob) => {
    console.log('Updating job:', updatedJob);
    
    try {
      const jobs = getJobs();
      const updatedJobs = jobs.map(job => 
        job.id === updatedJob.id ? updatedJob : job
      );
      saveJobs(updatedJobs);
      
      console.log('Job updated successfully');
      return updatedJob;
    } catch (error) {
      console.error('Update Error:', error);
      throw error;
    }
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path='/jobs' element={<JobsPage />} />
        <Route path='/jobs-table-view' element={<JobsTableViewPage deleteJob={deleteJob} />} />
        <Route path='/add-job' element={<AddJobPage addJobSubmit={addJob} />} />
        <Route
          path='/edit-job/:id'
          element={<EditJobPage updateJobSubmit={updateJob} />}
          loader={jobLoader}
        />
        <Route
          path='/jobs/:id'
          element={<JobPage deleteJob={deleteJob} />}
          loader={jobLoader}
        />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;