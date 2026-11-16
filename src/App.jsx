import React, { useEffect, useState } from 'react';
import './App.css';

const API = 'http://localhost:5000/api';

const request = async (url, method = 'GET', body = null) => {
  const token = localStorage.getItem('sk_token');

  const response = await fetch(API + url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
};
const list = data => {
  if (Array.isArray(data)) return data;

  if (!data || typeof data !== 'object') return [];

  const keys = [
    'products',
    'items',
    'orders',
    'customers',
    'cart',
    'wishlist',
    'data'
  ];

  for (const key of keys) {
    if (Array.isArray(data[key])) {
      return data[key];
    }

    if (data[key] && typeof data[key] === 'object') {
      const result = list(data[key]);

      if (result.length > 0) {
        return result;
      }
    }
  }

  return [];
};
const money = value =>
  '₹' + Number(value || 0).toLocaleString('en-IN');

const imageFallback =
  'https://placehold.co/500x600/f5eae4/70594e?text=SKINERA';

const categories = [
  'All', 'Cleanser', 'Toner', 'Serum', 'Essence',
  'Moisturizer', 'Sunscreen', 'Exfoliant', 'Eye Care'
];

const productFormat = p => ({
  ...p,
  id: p._id || p.id,
  image: p.image || p.images?.[0] || imageFallback,
  old: p.originalPrice || p.old || p.price,
});

const css = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600&display=swap');
:root{--ink:#493a33;--rose:#b8897e;--pale:#f4e9e3;--cream:#fcf9f6;--line:#e9ddd6;--muted:#8c7b72}
*{box-sizing:border-box}
body{margin:0;background:var(--cream);color:var(--ink);font-family:'DM Sans',sans-serif}
button,input,select,textarea{font:inherit}
button{cursor:pointer}
button:disabled{opacity:.5;cursor:not-allowed}
.top{background:var(--ink);color:white;text-align:center;padding:10px;font-size:10px;letter-spacing:2px}
header{background:#fffdfb;border-bottom:1px solid var(--line);padding:15px 5%;display:flex;align-items:center;justify-content:space-between;gap:15px;flex-wrap:wrap;position:sticky;top:0;z-index:5}
header button{border:0;background:none;color:var(--ink);font-size:12px}
.logo{text-align:center;cursor:pointer}
.logo strong{font:30px 'Playfair Display';letter-spacing:5px}
.logo small{display:block;font-size:8px;letter-spacing:2px}
nav,.icons{display:flex;gap:15px;align-items:center}
.btn{background:var(--ink);color:white;border:1px solid var(--ink);padding:13px 20px;font-size:11px;letter-spacing:1px}
.btn:hover{background:var(--rose);border-color:var(--rose)}
.outline{background:transparent;color:var(--ink)}
.hero{display:grid;grid-template-columns:1fr 1fr;background:var(--pale);min-height:420px}
.hero div{padding:60px 10%;display:flex;flex-direction:column;justify-content:center;align-items:flex-start}
.hero h1{font:clamp(42px,6vw,70px)/1.1 'Playfair Display';font-weight:400;margin:20px 0}
.hero h1 em{color:var(--rose)}
.hero p{line-height:1.9;color:var(--muted);font-size:14px}
.hero img{width:100%;height:100%;min-height:420px;object-fit:cover}
.eyebrow{font-size:10px;letter-spacing:3px;color:var(--rose);font-weight:bold}
.section,.page{padding:55px 5%;min-height:60vh}
.heading{text-align:center;margin-bottom:30px}
.heading h2,.page h1{font:38px 'Playfair Display';font-weight:400}
.heading p{color:var(--muted);font-size:13px}
.grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:18px}
.card{background:white;min-width:0}
.photo{height:260px;position:relative;cursor:pointer;background:var(--pale)}
.photo img{width:100%;height:100%;object-fit:cover}
.photo button{position:absolute;right:10px;top:10px;border:0;background:white;border-radius:50%;padding:8px}
.info{padding:13px}
.info small{color:var(--rose)}
.info h3{font:18px 'Playfair Display';min-height:40px}
.old{text-decoration:line-through;color:#a99b94;font-size:11px;margin-left:8px}
.add{width:100%;padding:11px;background:white;border:1px solid var(--line);margin-top:12px}
.add:hover{background:var(--ink);color:white}
.toolbar{display:flex;gap:12px;margin:20px 0}
input,select,textarea{padding:12px;border:1px solid var(--line);background:white;width:100%;color:var(--ink)}
.chips{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin:20px 0}
.chip{padding:9px 14px;background:white;border:1px solid var(--line);font-size:11px}
.chip.active{background:var(--ink);color:white}
.panel{background:white;border:1px solid var(--line);padding:25px;max-width:750px;margin:20px auto}
.auth{max-width:430px}
.auth h2{text-align:center;font:32px 'Playfair Display';font-weight:400}
.auth p{text-align:center;color:var(--muted);font-size:12px}
.field{margin:15px 0}
.field label{display:block;font-size:10px;letter-spacing:1px;margin-bottom:7px;color:var(--muted)}
.formgrid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.full{grid-column:1/-1}
.cartlayout{display:grid;grid-template-columns:1.5fr 1fr;gap:25px;max-width:1100px;margin:auto}
.cartitem{display:grid;grid-template-columns:90px 1fr auto;gap:15px;align-items:center;padding:15px;background:white;border-bottom:1px solid var(--line)}
.cartitem img{width:90px;height:100px;object-fit:cover}
.cartitem h3{font:18px 'Playfair Display'}
.qty{display:flex;gap:10px;align-items:center;margin-top:10px}
.qty button{padding:5px 10px;background:white;border:1px solid var(--line)}
.summary{background:white;border:1px solid var(--line);padding:20px;height:max-content}
.summary h2{font:25px 'Playfair Display'}
.sumrow{display:flex;justify-content:space-between;gap:10px;padding:12px 0;border-bottom:1px solid var(--line);font-size:13px}
.empty{text-align:center;padding:55px 15px;background:var(--pale)}
.story{background:var(--pale);padding:55px 10%;text-align:center}
.story h2{font:40px 'Playfair Display';font-weight:400}
footer{background:var(--ink);color:white;padding:35px 6%;display:grid;grid-template-columns:2fr 1fr 1fr;gap:20px}
footer p,footer button{color:#eee0d8;font-size:12px}
footer button{display:block;background:none;border:0;padding:7px 0}
.admin{display:grid;grid-template-columns:210px 1fr;min-height:75vh}
.sidebar{background:var(--ink);color:white;padding:20px}
.sidebar button{display:block;width:100%;text-align:left;background:none;border:0;color:white;padding:13px;font-size:12px}
.sidebar button.active{background:#806c60}
.adminmain{padding:25px;overflow:auto}
.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
.stat{background:white;border:1px solid var(--line);padding:18px}
.stat strong{display:block;font:27px 'Playfair Display';margin-top:8px}
.tablewrap{overflow:auto;background:white}
table{width:100%;border-collapse:collapse;font-size:12px}
td,th{padding:13px;border-bottom:1px solid var(--line);text-align:left}
th{background:var(--pale)}
.toast{position:fixed;bottom:20px;right:20px;background:var(--ink);color:white;padding:15px;z-index:10}
.modalbg{position:fixed;inset:0;background:#0009;display:grid;place-items:center;padding:20px;z-index:8}
.modal{background:white;max-width:750px;width:100%;display:grid;grid-template-columns:1fr 1fr;position:relative;max-height:90vh;overflow:auto}
.modal img{width:100%;height:100%;object-fit:cover;min-height:350px}
.modalcopy{padding:25px}
.modalcopy h2{font:30px 'Playfair Display'}
.close{position:absolute;right:10px;top:10px;border:0;background:white;padding:8px}
@media(max-width:800px){.grid{grid-template-columns:repeat(2,1fr)}.photo{height:210px}.stats{grid-template-columns:repeat(2,1fr)}.admin{grid-template-columns:1fr}.sidebar button{display:inline-block;width:auto}.hero{grid-template-columns:1fr}.hero img{height:280px;min-height:280px}}
@media(max-width:550px){header{justify-content:center}.hero div{padding:35px 7%}.cartlayout{grid-template-columns:1fr}.formgrid{grid-template-columns:1fr}.full{grid-column:auto}.modal{grid-template-columns:1fr}.modal img{height:230px;min-height:230px}.toolbar{flex-direction:column}footer{grid-template-columns:1fr}.section,.page{padding:35px 4%}.cartitem{grid-template-columns:70px 1fr}.cartitem img{width:70px;height:85px}}
`;

export default function App() {
  const [page, setPage] = useState('home');
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [stats, setStats] = useState({});
  const [user, setUser] = useState(null);
  const [toast, setToast] = useState('');
  const [selected, setSelected] = useState(null);
  const [authMode, setAuthMode] = useState('login');
  const [adminTab, setAdminTab] = useState('overview');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('featured');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [billing, setBilling] = useState({
    name: '', email: '', phone: '', address: '',
    city: '', state: '', pincode: '',
  });
  const [newProduct, setNewProduct] = useState({
    name: '', brand: '', category: 'Serum', price: '',
    old: '', description: '', image: '', stock: 20,
  });
  const [editing, setEditing] = useState(null);

  const isAdmin = user?.role === 'admin';

  const notify = message => {
    setToast(message);
    setTimeout(() => setToast(''), 2800);
  };

  const go = target => {
    setPage(target);
    setSelected(null);
    window.scrollTo(0, 0);
  };

  const loadProducts = async () => {
    try {
      const data = await request('/products');
      setProducts(list(data).map(productFormat));
    } catch (e) {
      notify(e.message);
    }
  };

  const loadCustomer = async () => {
  try {
    const [cartData, wishlistData, orderData] = await Promise.all([
      request('/cart'),
      request('/wishlist'),
      request('/orders/my')
    ]);

    const cartItems = list(cartData).map(item => {
      const product = item.product || item;

      return {
        ...productFormat(product),
        quantity: Number(item.quantity || 1)
      };
    });

    const wishItems = list(wishlistData).map(item =>
      productFormat(item.product || item)
    );
    setCart(cartItems);
    setWishlist(wishItems);
    setOrders(list(orderData));

  } catch (error) {
    console.error('Customer data loading error:', error);
    notify(error.message);
  }
};

  const loadAdmin = async () => {
    if (!isAdmin) return;

    try {
      const [d, o, c] = await Promise.all([
        request('/admin/dashboard'),
        request('/admin/orders'),
        request('/admin/customers'),
      ]);
      setStats(d.stats || d);
      setOrders(list(o));
      setCustomers(list(c));
    } catch (e) {
      notify(e.message);
    }
  };

  useEffect(() => {
    loadProducts();

    const token = localStorage.getItem('sk_token');
    if (token) {
      request('/auth/me')
        .then(data => setUser(data.user))
        .catch(() => {
          localStorage.removeItem('sk_token');
          setUser(null);
        });
    }
  }, []);

  useEffect(() => {
    if (user) loadCustomer();
    else {
      setCart([]);
      setWishlist([]);
      setOrders([]);
    }
  }, [user]);

  useEffect(() => {
    if (isAdmin) loadAdmin();
  }, [user, adminTab]);

  const totalItems = cart.reduce((sum, p) => sum + p.quantity, 0);
  const subtotal = cart.reduce((sum, p) => sum + p.price * p.quantity, 0);
  const delivery = subtotal === 0 || subtotal >= 999 ? 0 : 60;
  const total = subtotal + delivery;

  const filtered = products.filter(p => {
    const matchesCategory = category === 'All' || p.category === category;
    const matchesSearch = (p.name + ' ' + p.brand + ' ' + p.category)
      .toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sort === 'low') return a.price - b.price;
    if (sort === 'high') return b.price - a.price;
    if (sort === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  const login = async e => {
    e.preventDefault();
    try {
      const data = await request('/auth/login', 'POST', {
        email: form.email, password: form.password,
      });
      if (data.user.role === 'admin') {
        notify('Please use the separate Admin Login.');
        return;
      }
      localStorage.setItem('sk_token', data.token);
      setUser(data.user);
      setForm({ name: '', email: '', password: '' });
      go('account');
      notify('Welcome to SKINÉRA');
    } catch (e) {
      notify(e.message);
    }
  };

  const adminLogin = async e => {
    e.preventDefault();
    try {
      const data = await request('/auth/login', 'POST', {
        email: form.email, password: form.password,
      });
      if (data.user.role !== 'admin') {
        throw new Error('Admin account required.');
      }
      localStorage.setItem('sk_token', data.token);
      setUser(data.user);
      setForm({ name: '', email: '', password: '' });
      go('admin');
      notify('Welcome to SKINÉRA administration');
    } catch (e) {
      notify(e.message);
    }
  };

  const register = async e => {
    e.preventDefault();
    try {
      const data = await request('/auth/register', 'POST', form);
      localStorage.setItem('sk_token', data.token);
      setUser(data.user);
      go('account');
      notify('Account created successfully');
    } catch (e) {
      notify(e.message);
    }
  };

  const logout = () => {
    localStorage.removeItem('sk_token');
    setUser(null);
    go('home');
    notify('Signed out successfully');
  };

  const addToCart = async product => {
    if (!user) {
      notify('Please sign in first');
      go('login');
      return;
    }
    try {
      await request('/cart', 'POST', {
        productId: product.id, quantity: 1,
      });
      await loadCustomer();
      notify('Added to your bag');
    } catch (e) {
      notify(e.message);
    }
  };

  const changeQty = async (id, amount) => {
    const item = cart.find(p => p.id === id);
    if (!item) return;
    try {
      const quantity = item.quantity + amount;
      if (quantity <= 0) {
        await request('/cart/' + id, 'DELETE');
      } else {
        await request('/cart/' + id, 'PUT', { quantity });
      }
      await loadCustomer();
    } catch (e) {
      notify(e.message);
    }
  };

  const toggleWish = async product => {
    if (!user) {
      notify('Please sign in first');
      go('login');
      return;
    }
    try {
      await request('/wishlist/' + product.id, 'POST', {});
      await loadCustomer();
      notify('Wishlist updated');
    } catch (e) {
      notify(e.message);
    }
  };

  const placeOrder = async e => {
    e.preventDefault();
    try {
      await request('/orders', 'POST', {
        shippingAddress: {
          fullName: billing.name,
          phone: billing.phone,
          address: billing.address,
          city: billing.city,
          state: billing.state,
          postalCode: billing.pincode,
          country: 'India',
        },
        paymentMethod: 'COD',
      });
      await loadCustomer();
      go('success');
      notify('Your order has been placed!');
    } catch (e) {
      notify(e.message);
    }
  };

  const saveProduct = async e => {
    e.preventDefault();
    const data = {
      ...newProduct,
      price: Number(newProduct.price),
      originalPrice: Number(newProduct.old || newProduct.price),
      stock: Number(newProduct.stock),
      images: newProduct.image ? [newProduct.image] : [],
    };
    try {
      if (editing) {
        await request('/products/' + editing, 'PUT', data);
        notify('Product updated');
      } else {
        await request('/products', 'POST', data);
        notify('Product added');
      }
      setNewProduct({
        name: '', brand: '', category: 'Serum', price: '',
        old: '', description: '', image: '', stock: 20,
      });
      setEditing(null);
      await loadProducts();
      await loadAdmin();
      setAdminTab('products');
    } catch (e) {
      notify(e.message);
    }
  };

  const editProduct = p => {
    setNewProduct({
      name: p.name || '',
      brand: p.brand || '',
      category: p.category || 'Serum',
      price: p.price || '',
      old: p.old || p.price || '',
      description: p.description || '',
      image: p.image || '',
      stock: p.stock || 20,
    });
    setEditing(p.id);
    setAdminTab('add');
  };

  const deleteProduct = async id => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await request('/products/' + id, 'DELETE');
      await loadProducts();
      await loadAdmin();
      notify('Product deleted');
    } catch (e) {
      notify(e.message);
    }
  };

  const updateOrder = async (id, orderStatus) => {
    try {
      await request('/admin/orders/' + id + '/status', 'PUT', { orderStatus });
      await loadAdmin();
      notify('Order status updated');
    } catch (e) {
      notify(e.message);
    }
  };

  const ProductCard = ({ p }) => (
    <article className="card">
      <div className="photo" onClick={() => setSelected(p)}>
        <img src={p.image} alt={p.name}
          onError={e => { e.currentTarget.src = imageFallback; }} />
        <button onClick={e => {
          e.stopPropagation();
          toggleWish(p);
        }}>♡</button>
      </div>
      <div className="info">
        <small>{p.brand}</small>
        <h3 onClick={() => setSelected(p)}>{p.name}</h3>
        <b>{money(p.price)}</b>
        <span className="old">{money(p.old)}</span>
        <button className="add" onClick={() => addToCart(p)}>ADD TO BAG +</button>
      </div>
    </article>
  );

  const Header = () => (
    <>
      <div className="top">A LITTLE CARE, A LOT OF GLOW · FREE DELIVERY ABOVE ₹999</div>
      <header>
        <nav>
          <button onClick={() => go('home')}>HOME</button>
          <button onClick={() => go('shop')}>SHOP</button>
          <button onClick={() => go('story')}>OUR STORY</button>
        </nav>
        <div className="logo" onClick={() => go('home')}>
          <strong>SKINÉRA</strong>
          <small>THE ART OF GENTLE SKINCARE</small>
        </div>
        <div className="icons">
          <button onClick={() => go('wishlist')}>♡ {wishlist.length}</button>
          <button onClick={() => go('cart')}>BAG {totalItems}</button>
          <button onClick={() => go(user ? 'account' : 'login')}>ACCOUNT</button>
        </div>
      </header>
    </>
  );

  const Footer = () => (
    <footer>
      <div><h2>SKINÉRA</h2><p>Thoughtful skincare. Gentle rituals. Everyday glow.</p></div>
      <div><h3>EXPLORE</h3>
        <button onClick={() => go('shop')}>Shop all</button>
        <button onClick={() => go('story')}>Our story</button>
      </div>
      <div><h3>ACCOUNT</h3>
        <button onClick={() => go('login')}>Sign in</button>
        <button onClick={() => go('orders')}>My orders</button>
        {isAdmin && <button onClick={() => go('admin')}>Admin dashboard</button>}
      </div>
    </footer>
  );

  const Home = () => (
    <>
      <section className="hero">
        <div>
          <span className="eyebrow">A RITUAL, NOT A ROUTINE</span>
          <h1>Find your <em>everyday glow.</em></h1>
          <p>Thoughtful Korean skincare for the moments you make time for yourself.</p>
          <button className="btn" onClick={() => go('shop')}>DISCOVER THE COLLECTION</button>
        </div>
        <img src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=1200" alt="Skincare collection" />
      </section>
      <section className="section">
        <div className="heading">
          <span className="eyebrow">CURATED FOR YOUR SKIN</span>
          <h2>The everyday essentials</h2>
          <p>Small rituals. Thoughtful formulas. A little more glow.</p>
        </div>
        <div className="grid">{products.slice(0, 4).map(p => <ProductCard key={p.id} p={p} />)}</div>
        <div style={{ textAlign: 'center', marginTop: 30 }}>
          <button className="btn" onClick={() => go('shop')}>VIEW ALL PRODUCTS</button>
        </div>
      </section>
      <section className="story">
        <span className="eyebrow">THE SKINÉRA PHILOSOPHY</span>
        <h2>Skincare should feel like care.</h2>
        <p>Thoughtful products, gentle rituals and calm moments for yourself.</p>
        <button className="btn" onClick={() => go('story')}>OUR STORY</button>
      </section>
    </>
  );

  const Shop = () => (
    <section className="section">
      <div className="heading">
        <span className="eyebrow">THE SKINÉRA COLLECTION</span>
        <h2>Find your skin essentials</h2>
      </div>
      <div className="toolbar">
        <input placeholder="Search products and brands..." value={search}
          onChange={e => setSearch(e.target.value)} />
        <select value={sort} onChange={e => setSort(e.target.value)}>
          <option value="featured">Featured</option>
          <option value="low">Price: low to high</option>
          <option value="high">Price: high to low</option>
          <option value="name">Name A–Z</option>
        </select>
      </div>
      <div className="chips">
        {categories.map(c => <button key={c}
          className={'chip ' + (category === c ? 'active' : '')}
          onClick={() => setCategory(c)}>{c}</button>)}
      </div>
      <div className="grid">
        {filtered.map(p => <ProductCard key={p.id} p={p} />)}
      </div>
      {!filtered.length && <div className="empty">No products found.</div>}
    </section>
  );

  const Auth = ({ admin = false }) => (
    <section className="page">
      <div className="panel auth">
        <span className="eyebrow">{admin ? 'SKINÉRA ADMINISTRATION' : 'WELCOME TO SKINÉRA'}</span>
        <h2>{admin ? 'Admin sign in.' : authMode === 'login' ? 'Welcome back.' : 'Create your account.'}</h2>
        <p>{admin ? 'Sign in to manage your SKINÉRA store.' : 'Your everyday skincare ritual starts here.'}</p>
        <form onSubmit={admin ? adminLogin : authMode === 'login' ? login : register}>
          {!admin && authMode === 'register' && (
            <div className="field"><label>Full name</label>
              <input required value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
          )}
          <div className="field"><label>Email address</label>
            <input required type="email" value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })} />
          </div>
          <div className="field"><label>Password</label>
            <input required type="password" minLength="6" value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })} />
          </div>
          <button className="btn" style={{ width: '100%' }}>
            {admin ? 'ADMIN SIGN IN' : authMode === 'login' ? 'SIGN IN' : 'CREATE ACCOUNT'}
          </button>
        </form>
        {admin ? (
          <p><button className="outline" onClick={() => go('login')}>Back to customer login</button></p>
        ) : (
          <>
            <p>
              {authMode === 'login' ? "Don't have an account? " : 'Already registered? '}
              <button onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}>
                {authMode === 'login' ? 'Create one' : 'Sign in'}
              </button>
            </p>
            {authMode === 'login' && <p>Store administrator? <button onClick={() => {
              setForm({ name: '', email: '', password: '' });
              go('admin-login');
            }}>Admin Login</button></p>}
          </>
        )}
      </div>
    </section>
  );

  const Cart = () => (
    <section className="page">
      <h1>Your shopping bag</h1>
      {!cart.length ? <div className="empty">
        <h2>Your bag is waiting.</h2>
        <button className="btn" onClick={() => go('shop')}>EXPLORE THE SHOP</button>
      </div> : (
        <div className="cartlayout">
          <div>{cart.map(p => <div className="cartitem" key={p.id}>
            <img src={p.image} alt={p.name} />
            <div><small>{p.brand}</small><h3>{p.name}</h3><b>{money(p.price)}</b>
              <div className="qty">
                <button onClick={() => changeQty(p.id, -1)}>−</button>
                {p.quantity}
                <button onClick={() => changeQty(p.id, 1)}>+</button>
                <button onClick={() => changeQty(p.id, -p.quantity)}>Remove</button>
              </div>
            </div>
            <b>{money(p.price * p.quantity)}</b>
          </div>)}</div>
          <aside className="summary">
            <h2>Order summary</h2>
            <div className="sumrow"><span>Subtotal</span><b>{money(subtotal)}</b></div>
            <div className="sumrow"><span>Delivery</span><b>{delivery ? money(delivery) : 'FREE'}</b></div>
            <div className="sumrow"><b>Total</b><b>{money(total)}</b></div>
            <button className="btn" style={{ width: '100%', marginTop: 15 }}
              onClick={() => go(user ? 'checkout' : 'login')}>PROCEED TO CHECKOUT</button>
          </aside>
        </div>
      )}
    </section>
  );

  const Checkout = () => (
    <section className="page">
      <h1>Billing & delivery</h1>
      {!cart.length ? <div className="empty">Your bag is empty.</div> : (
        <div className="cartlayout">
          <form className="panel" onSubmit={placeOrder}>
            <h2>Delivery details</h2>
            <div className="formgrid">
              {[
                ['name', 'Full name'], ['email', 'Email'],
                ['phone', 'Phone number'], ['pincode', 'PIN code'],
                ['address', 'House / street / area'],
                ['city', 'City'], ['state', 'State'],
              ].map(([key, label]) => <div className="field" key={key}>
                <label>{label}</label>
                <input required value={billing[key]}
                  onChange={e => setBilling({ ...billing, [key]: e.target.value })} />
              </div>)}
            </div>
            <p>Payment method: Cash on Delivery (COD)</p>
            <button className="btn" style={{ width: '100%' }}>PLACE ORDER · {money(total)}</button>
          </form>
          <aside className="summary"><h2>Your order</h2>
            {cart.map(p => <div className="sumrow" key={p.id}>
              <span>{p.name} × {p.quantity}</span><b>{money(p.price * p.quantity)}</b>
            </div>)}
            <div className="sumrow"><b>Total</b><b>{money(total)}</b></div>
          </aside>
        </div>
      )}
    </section>
  );

  const Account = () => (
    <section className="page">
      <h1>My account</h1>
      <div className="panel">
        <h2>Hello, {user?.name}</h2>
        <p>{user?.email}</p>
        <button className="btn" onClick={() => go('orders')}>MY ORDERS</button>
        <button className="btn outline" onClick={logout}>SIGN OUT</button>
      </div>
    </section>
  );

  const Orders = () => (
    <section className="page">
      <h1>My orders</h1>
      {!orders.length ? <div className="empty">No orders yet.</div> :
        orders.map(o => <div className="panel" key={o._id || o.id}>
          <div className="sumrow">
            <b>Order {o._id || o.id}</b>
            <span>{o.orderStatus || o.status}</span>
          </div>
          <p>Placed {o.createdAt ? new Date(o.createdAt).toLocaleDateString('en-IN') : ''}</p>
          <b>{money(o.totalAmount || o.total)}</b>
        </div>)}
    </section>
  );

  const Admin = () => (
    <div className="admin">
      <aside className="sidebar">
        <h2>SKINÉRA</h2>
        <p>STORE ADMINISTRATION</p>
        {['overview', 'products', 'add', 'orders', 'customers'].map(t =>
          <button className={adminTab === t ? 'active' : ''} key={t}
            onClick={() => setAdminTab(t)}>
            {({ overview: 'Dashboard', products: 'Products', add: 'Add product',
              orders: 'Orders', customers: 'Customers' })[t]}
          </button>
        )}
        <button onClick={() => go('home')}>← Customer store</button>
        <button onClick={logout}>Sign out</button>
      </aside>
      <main className="adminmain">
        <h1>{adminTab === 'overview' ? 'Dashboard overview' :
          adminTab === 'products' ? 'Manage products' :
          adminTab === 'add' ? editing ? 'Edit product' : 'Add product' :
          adminTab === 'orders' ? 'Customer orders' : 'Customers'}</h1>

        {adminTab === 'overview' && <div className="stats">
          <div className="stat">PRODUCTS<strong>{stats.products ?? products.length}</strong></div>
          <div className="stat">ORDERS<strong>{stats.orders ?? orders.length}</strong></div>
          <div className="stat">CUSTOMERS<strong>{stats.users ?? customers.length}</strong></div>
          <div className="stat">REVENUE<strong>{money(stats.revenue)}</strong></div>
        </div>}

        {adminTab === 'products' && <div className="tablewrap">
          <table><thead><tr><th>PRODUCT</th><th>CATEGORY</th><th>PRICE</th><th>ACTIONS</th></tr></thead>
            <tbody>{products.map(p => <tr key={p.id}>
              <td>{p.name}</td><td>{p.category}</td><td>{money(p.price)}</td>
              <td><button onClick={() => editProduct(p)}>Edit</button>
                <button onClick={() => deleteProduct(p.id)}>Delete</button></td>
            </tr>)}</tbody>
          </table>
        </div>}

        {adminTab === 'add' && <form className="panel" onSubmit={saveProduct}>
          <div className="formgrid">
            {[
              ['name', 'Product name'], ['brand', 'Brand'],
              ['price', 'Selling price'], ['old', 'Original price'],
              ['image', 'Image URL'], ['stock', 'Stock quantity'],
            ].map(([key, label]) => <div className="field" key={key}>
              <label>{label}</label>
              <input required={key === 'name' || key === 'price'}
                type={['price', 'old', 'stock'].includes(key) ? 'number' : 'text'}
                value={newProduct[key]}
                onChange={e => setNewProduct({ ...newProduct, [key]: e.target.value })} />
            </div>)}
            <div className="field"><label>Category</label>
              <select value={newProduct.category}
                onChange={e => setNewProduct({ ...newProduct, category: e.target.value })}>
                {categories.slice(1).map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="field full"><label>Description</label>
              <textarea value={newProduct.description}
                onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} />
            </div>
          </div>
          <button className="btn">{editing ? 'SAVE CHANGES' : 'ADD PRODUCT'}</button>
          {editing && <button type="button" className="btn outline" onClick={() => {
            setEditing(null);
            setNewProduct({
              name: '', brand: '', category: 'Serum', price: '',
              old: '', description: '', image: '', stock: 20,
            });
          }}>CANCEL</button>}
        </form>}

        {adminTab === 'orders' && <div className="tablewrap">
          <table><thead><tr><th>ORDER</th><th>CUSTOMER</th><th>TOTAL</th><th>STATUS</th></tr></thead>
            <tbody>{orders.map(o => <tr key={o._id || o.id}>
              <td>{o._id || o.id}</td>
              <td>{o.user?.name || o.shippingAddress?.fullName || 'Customer'}</td>
              <td>{money(o.totalAmount || o.total)}</td>
              <td><select value={o.orderStatus || o.status || 'Placed'}
                onChange={e => updateOrder(o._id || o.id, e.target.value)}>
                {['Placed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map(s =>
                  <option key={s}>{s}</option>)}
              </select></td>
            </tr>)}</tbody>
          </table>
        </div>}

        {adminTab === 'customers' && <div className="tablewrap">
          <table><thead><tr><th>NAME</th><th>EMAIL</th><th>ROLE</th></tr></thead>
            <tbody>{customers.map(c => <tr key={c._id || c.email}>
              <td>{c.name}</td><td>{c.email}</td><td>{c.role}</td>
            </tr>)}</tbody>
          </table>
        </div>}
      </main>
    </div>
  );

  return (
    <>
      <style>{css}</style>
      <Header />

      {page === 'home' && <Home />}
      {page === 'shop' && <Shop />}
      {page === 'login' && <Auth />}
      {page === 'admin-login' && <Auth admin />}
      {page === 'cart' && <Cart />}
      {page === 'checkout' && <Checkout />}
      {page === 'account' && <Account />}
      {page === 'orders' && <Orders />}

      {page === 'wishlist' && <section className="section">
        <div className="heading"><h2>Your wishlist</h2></div>
        {wishlist.length ?
          <div className="grid">{wishlist.map(p => <ProductCard key={p.id} p={p} />)}</div> :
          <div className="empty">No saved products yet.</div>}
      </section>}

      {page === 'story' && <section className="story">
        <span className="eyebrow">OUR STORY</span>
        <h2>Gentle care, everyday confidence.</h2>
        <p>SKINÉRA is built around thoughtful Korean skincare and everyday rituals.</p>
        <button className="btn" onClick={() => go('shop')}>EXPLORE THE COLLECTION</button>
      </section>}

      {page === 'admin' && (isAdmin ? <Admin /> :
        <section className="page"><div className="empty">
          <h2>Admin sign in required.</h2>
          <button className="btn" onClick={() => go('admin-login')}>ADMIN SIGN IN</button>
        </div></section>)}

      {page === 'success' && <section className="page">
        <div className="empty">
          <h2>Your order has been placed!</h2>
          <button className="btn" onClick={() => go('orders')}>VIEW MY ORDERS</button>
          <button className="btn outline" onClick={() => go('shop')}>CONTINUE SHOPPING</button>
        </div>
      </section>}

      {page !== 'admin' && <Footer />}

      {selected && <div className="modalbg" onClick={() => setSelected(null)}>
        <div className="modal" onClick={e => e.stopPropagation()}>
          <button className="close" onClick={() => setSelected(null)}>×</button>
          <img src={selected.image} alt={selected.name} />
          <div className="modalcopy">
            <small>{selected.brand}</small>
            <h2>{selected.name}</h2>
            <b>{money(selected.price)}</b>
            <p>{selected.description}</p>
            <button className="btn" style={{ width: '100%' }} onClick={() => {
              addToCart(selected);
              setSelected(null);
            }}>ADD TO BAG</button>
            <button className="btn outline" style={{ width: '100%', marginTop: 10 }}
              onClick={() => toggleWish(selected)}>SAVE TO WISHLIST</button>
          </div>
        </div>
      </div>}

      {toast && <div className="toast">{toast}</div>}
    </>
  );
}