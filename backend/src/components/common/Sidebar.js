import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [hovered, setHovered] = React.useState('');
  const [submenuOpen, setSubmenuOpen] = React.useState('');
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setIsOpen(true);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { path: '/admindashboard/viewadmin', label: 'Admin' },
    { path: '/admindashboard/viewstudent', label: 'Students' },
    {
      label: 'Category',
      children: [
        { path: '/admindashboard/addcategory', label: 'Add Category' },
        { path: '/admindashboard/viewcategory', label: 'View Category' },
      ],
    },
    {
      label: 'Topic',
      children: [
        { path: '/admindashboard/addtopic', label: 'Add Topic' },
        { path: '/admindashboard/viewtopic', label: 'View Topic' },
      ],
    },
    {
      label: 'Question',
      children: [
        { path: '/admindashboard/addquestion', label: 'Add Question' },
        { path: '/admindashboard/viewquestion', label: 'View Question' },
      ],
    },
    {
      label: 'Answer',
      children: [
        { path: '/admindashboard/addanswer', label: 'Add Answer' },
        { path: '/admindashboard/viewanswer', label: 'View Answer' },
      ],
    },
  ];

  const wrapper = {
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  backgroundColor: 'rgb(44, 62, 80)',
};


  const mobileWrapper = {
    position: 'relative',
    width: '100%',
    minHeight: '100vh',
    backgroundColor: '#2C3E50',
  };

  const mobileHeader = {
    backgroundColor: '#2C3E50',
    display: 'flex',
    alignItems: 'center',
    padding: '10px 16px',
  };

  const hamburgerButton = {
    fontSize: '22px',
    backgroundColor: 'transparent',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  };

  const sidebarStyle = {
    width: '240px',
    backgroundColor: '#2C3E50',
    color: '#ecf0f1',
    padding: '20px 10px',
    display: 'flex',
    flexDirection: 'column',
  };

  const mobileSidebarStyle = {
    width: '100%',
    backgroundColor: '#2C3E50',
    color: '#ecf0f1',
    padding: '10px 10px',
  };

  const linkStyle = {
    textDecoration: 'none',
    color: '#ecf0f1',
    padding: '12px 16px',
    borderRadius: '6px',
    marginBottom: '8px',
    fontSize: '16px',
    transition: 'all 0.3s ease',
    display: 'block',
  };

  const linkHoverStyle = {
    backgroundColor: '#34495e',
    paddingLeft: '24px',
  };

  const mobileLinkStyle = {
    fontSize: '15px',
    padding: '10px 14px',
  };

  return (
    <div style={isMobile ? mobileWrapper : wrapper}>
      {isMobile && (
        <div style={mobileHeader}>
          <button onClick={() => setIsOpen(!isOpen)} style={hamburgerButton}>
            ☰
          </button>
          <span style={{ color: '#fff', marginLeft: '10px', fontWeight: 'bold' }}>
            Admin Menu
          </span>
        </div>
      )}

      {(!isMobile || isOpen) && (
        <div style={isMobile ? mobileSidebarStyle : sidebarStyle}>
          <nav>
            {navItems.map((item) => {
              if (item.children) {
                const isSubmenuVisible = submenuOpen === item.label;

                return (
                  <div
                    key={item.label}
                    onMouseEnter={() => !isMobile && setSubmenuOpen(item.label)}
                    onMouseLeave={() => !isMobile && setSubmenuOpen('')}
                    onClick={() => isMobile && setSubmenuOpen((prev) => (prev === item.label ? '' : item.label))}
                  >
                    <div
                      style={{
                        ...linkStyle,
                        ...(hovered === item.label ? linkHoverStyle : {}),
                        ...(isMobile ? mobileLinkStyle : {}),
                        cursor: 'pointer',
                      }}
                      onMouseEnter={() => setHovered(item.label)}
                      onMouseLeave={() => setHovered('')}
                    >
                      {item.label} ▾
                    </div>

                    {isSubmenuVisible && (
                      <div style={{ paddingLeft: '16px' }}>
                        {item.children.map((child) => (
                          <Link
                            key={child.path}
                            to={child.path}
                            style={{
                              ...linkStyle,
                              ...(hovered === child.path ? linkHoverStyle : {}),
                              ...(isMobile ? mobileLinkStyle : {}),
                            }}
                            onMouseEnter={() => setHovered(child.path)}
                            onMouseLeave={() => setHovered('')}
                            onClick={() => isMobile && setIsOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  style={{
                    ...linkStyle,
                    ...(hovered === item.path ? linkHoverStyle : {}),
                    ...(isMobile ? mobileLinkStyle : {}),
                  }}
                  onMouseEnter={() => setHovered(item.path)}
                  onMouseLeave={() => setHovered('')}
                  onClick={() => isMobile && setIsOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
