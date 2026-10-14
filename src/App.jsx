
import { useState } from "react";
import {
  LayoutDashboard,
  Building2,
  BedDouble,
  CalendarDays,
  Users,
  Settings,
  Search,
  Bell,
  Plus,
  Menu,
  X,
  ArrowUpRight,
  MapPin,
  Clock3,
} from "lucide-react";
import "./App.css";

const navigation = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Properties", icon: Building2 },
  { label: "Rooms", icon: BedDouble },
  { label: "Bookings", icon: CalendarDays },
  { label: "Customers", icon: Users },
];

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [search, setSearch] = useState("");
  const [showRoomForm, setShowRoomForm] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [roomForm, setRoomForm] = useState({
    number: "",
    type: "Standard",
    property: "",
    price: "",
    status: "Available",
  });

  const filteredRooms = rooms.filter((room) =>
    `${room.number} ${room.type} ${room.property}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  function addRoom(event) {
    event.preventDefault();

    setRooms((previous) => [
      ...previous,
      { ...roomForm, id: Date.now() },
    ]);

    setRoomForm({
      number: "",
      type: "Standard",
      property: "",
      price: "",
      status: "Available",
    });
    setShowRoomForm(false);
    setActivePage("Rooms");
  }

  const stats = [
    { label: "Properties", value: "—", icon: Building2, color: "blue" },
    { label: "Total Rooms", value: rooms.length, icon: BedDouble, color: "purple" },
    { label: "Bookings", value: "—", icon: CalendarDays, color: "orange" },
    { label: "Customers", value: "—", icon: Users, color: "pink" },
  ];

  return (
    <div className="app-shell">
      {mobileMenu && (
        <button
          className="mobile-overlay"
          aria-label="Close navigation"
          onClick={() => setMobileMenu(false)}
        />
      )}

      <aside className={`sidebar ${mobileMenu ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-icon"><Building2 size={23} /></div>
          <div>
            <h2>HavenStay</h2>
            <span>PROPERTY MANAGEMENT</span>
          </div>
          <button
            className="close-menu"
            onClick={() => setMobileMenu(false)}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <div className="nav-caption">WORKSPACE</div>
        <nav className="navigation">
          {navigation.map(({ label, icon: Icon }) => (
            <button
              key={label}
              className={`nav-item ${activePage === label ? "active" : ""}`}
              onClick={() => {
                setActivePage(label);
                setMobileMenu(false);
              }}
            >
              <Icon size={19} strokeWidth={1.8} />
              <span>{label}</span>
              {label === "Rooms" && (
                <span className="nav-count">{rooms.length}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="help-card">
            <div className="help-icon">✦</div>
            <strong>Need some help?</strong>
            <p>Manage your properties and bookings in one place.</p>
          </div>
          <button className="nav-item" onClick={() => alert("Settings coming soon.")}>
            <Settings size={19} />
            <span>Settings</span>
          </button>
          <div className="profile">
            <div className="avatar">HS</div>
            <div className="profile-text">
              <strong>Hotel Administrator</strong>
              <span>Administrator</span>
            </div>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <button
            className="menu-button"
            onClick={() => setMobileMenu(true)}
            aria-label="Open navigation"
          >
            <Menu size={22} />
          </button>
          <div className="breadcrumb">
            <span>Workspace</span>
            <span className="breadcrumb-divider">/</span>
            <strong>{activePage}</strong>
          </div>
          <div className="topbar-actions">
            <label className="search-box">
              <Search size={17} />
              <input
                placeholder="Search rooms..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
              <kbd>⌘ K</kbd>
            </label>
            <button className="notification-button" aria-label="Notifications">
              <Bell size={20} />
              <span />
            </button>
            <div className="top-avatar">HA</div>
          </div>
        </header>

        <div className="page-content">
          <div className="welcome-row">
            <div>
              <div className="eyebrow">OVERVIEW</div>
              <h1>{activePage === "Dashboard" ? "Good day, Administrator" : activePage}</h1>
              <p className="page-subtitle">
                {activePage === "Dashboard"
                  ? "Here's what's happening with your properties today."
                  : `Manage your ${activePage.toLowerCase()} and keep everything organized.`}
              </p>
            </div>
            <button className="primary-button" onClick={() => setShowRoomForm(true)}>
              <Plus size={18} />
              Add New Room
            </button>
          </div>

          {activePage === "Dashboard" && (
            <>
              <section className="stats-grid">
                {stats.map(({ label, value, icon: Icon, color }) => (
                  <article className="stat-card" key={label}>
                    <div className={`stat-icon ${color}`}><Icon size={21} /></div>
                    <div className="stat-label">{label}</div>
                    <div className="stat-value">{value}</div>
                    <div className="stat-note">
                      <ArrowUpRight size={14} />
                      <span>{label === "Total Rooms" ? "Your room inventory" : "Connect database to load"}</span>
                    </div>
                  </article>
                ))}
              </section>

              <section className="content-grid">
                <article className="panel rooms-panel">
                  <div className="panel-heading">
                    <div>
                      <h2>Recent Rooms</h2>
                      <p>Your room inventory at a glance</p>
                    </div>
                    <button className="text-button" onClick={() => setActivePage("Rooms")}>
                      View all <ArrowUpRight size={15} />
                    </button>
                  </div>
                  <RoomTable rooms={rooms.slice(0, 4)} />
                </article>

                <article className="panel activity-panel">
                  <div className="panel-heading">
                    <div>
                      <h2>Quick overview</h2>
                      <p>Workspace status</p>
                    </div>
                  </div>
                  <div className="overview-item">
                    <div className="overview-icon blue"><Building2 size={18} /></div>
                    <div><strong>Property portfolio</strong><span>Ready to configure</span></div>
                  </div>
                  <div className="overview-item">
                    <div className="overview-icon purple"><BedDouble size={18} /></div>
                    <div><strong>Room inventory</strong><span>{rooms.length} room(s) added in this session</span></div>
                  </div>
                  <div className="overview-item">
                    <div className="overview-icon orange"><Clock3 size={18} /></div>
                    <div><strong>Booking management</strong><span>Ready to connect to API</span></div>
                  </div>
                  <button className="secondary-button" onClick={() => setActivePage("Bookings")}>
                    View bookings <ArrowUpRight size={16} />
                  </button>
                </article>
              </section>
            </>
          )}

          {activePage === "Rooms" && (
            <section className="panel full-panel">
              <div className="panel-heading">
                <div><h2>All Rooms</h2><p>{filteredRooms.length} room(s) in this session</p></div>
                <button className="primary-button compact" onClick={() => setShowRoomForm(true)}>
                  <Plus size={17} /> Add room
                </button>
              </div>
              <RoomTable rooms={filteredRooms} />
            </section>
          )}

          {activePage !== "Dashboard" && activePage !== "Rooms" && (
            <section className="panel placeholder-panel">
              <div className="placeholder-icon">
                {activePage === "Properties" && <Building2 size={30} />}
                {activePage === "Bookings" && <CalendarDays size={30} />}
                {activePage === "Customers" && <Users size={30} />}
              </div>
              <h2>{activePage} management</h2>
              <p>This section will be connected to the Laravel API in the next step.</p>
              {activePage === "Properties" && <p><MapPin size={15} /> Manage your hotels and properties here.</p>}
              <button className="primary-button" onClick={() => setShowRoomForm(true)}>
                <Plus size={18} /> Add a room
              </button>
            </section>
          )}
        </div>
      </main>

      <button
        className="floating-button"
        aria-label="Add a new room"
        title="Add a new room"
        onClick={() => setShowRoomForm(true)}
      >
        <Plus size={25} />
      </button>

      {showRoomForm && (
        <div className="modal-backdrop" onClick={() => setShowRoomForm(false)}>
          <section className="room-modal" onClick={(event) => event.stopPropagation()}>
            <div className="modal-heading">
              <div><h2>Add new room</h2><p>Enter the room details below.</p></div>
              <button className="close-modal" onClick={() => setShowRoomForm(false)} aria-label="Close form">
                <X size={21} />
              </button>
            </div>
            <form onSubmit={addRoom}>
              <label>Room number
                <input required value={roomForm.number} placeholder="e.g. 101"
                  onChange={(e) => setRoomForm({ ...roomForm, number: e.target.value })} />
              </label>
              <label>Room type
                <select value={roomForm.type}
                  onChange={(e) => setRoomForm({ ...roomForm, type: e.target.value })}>
                  <option>Standard</option><option>Deluxe</option><option>Suite</option><option>Family</option>
                </select>
              </label>
              <label>Property / Hotel name
                <input required value={roomForm.property} placeholder="e.g. HavenStay Hotel"
                  onChange={(e) => setRoomForm({ ...roomForm, property: e.target.value })} />
              </label>
              <label>Price per night (₱)
                <input required type="number" min="1" value={roomForm.price} placeholder="2500"
                  onChange={(e) => setRoomForm({ ...roomForm, price: e.target.value })} />
              </label>
              <label>Room status
                <select value={roomForm.status}
                  onChange={(e) => setRoomForm({ ...roomForm, status: e.target.value })}>
                  <option>Available</option><option>Occupied</option><option>Maintenance</option>
                </select>
              </label>
              <div className="form-actions">
                <button type="button" className="secondary-button" onClick={() => setShowRoomForm(false)}>Cancel</button>
                <button type="submit" className="primary-button">Save room</button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}

function RoomTable({ rooms }) {
  if (!rooms.length) {
    return (
      <div className="empty-state">
        <div className="empty-icon"><BedDouble size={27} /></div>
        <h3>No rooms added yet</h3>
        <p>Add a room to start building your inventory.</p>
      </div>
    );
  }

  return (
    <div className="table-scroll">
      <table className="rooms-table">
        <thead>
          <tr><th>ROOM</th><th>PROPERTY</th><th>TYPE</th><th>PRICE / NIGHT</th><th>STATUS</th></tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.id}>
              <td><strong>{room.number}</strong></td>
              <td>{room.property}</td>
              <td>{room.type}</td>
              <td>₱{Number(room.price).toLocaleString("en-PH")}</td>
              <td><span className={`status-pill ${room.status.toLowerCase()}`}>{room.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
