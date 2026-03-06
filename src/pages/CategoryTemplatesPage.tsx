import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';
import { ArrowLeft, Search, SlidersHorizontal, Check, X, QrCode, CreditCard, ChevronRight, Home, ArrowRight, Download, Eye } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// Mock Data Generator
const generateTemplates = (category: string) => {
  return Array.from({ length: 12 }).map((_, i) => ({
    id: `${category}-${i}`,
    name: `${category.charAt(0).toUpperCase() + category.slice(1)} Pro ${i + 1}`,
    category,
    orientation: i % 3 === 0 ? 'horizontal' : 'vertical',
    color: ['blue', 'red', 'green', 'dark'][i % 4],
    tags: ['Modern', 'Minimal', 'Enterprise'][i % 3],
    features: [
      i % 2 === 0 ? 'qr' : null,
      i % 3 === 0 ? 'barcode' : null,
    ].filter(Boolean),
    image: `https://picsum.photos/seed/${category}-${i}/400/600`
  }));
};

export function CategoryTemplatesPage() {
  const { category } = useParams<{ category: string }>();
  const { user } = useAuth();

  const [templates] = useState(generateTemplates(category || 'general'));
  const [filters, setFilters] = useState({
    orientation: 'all',
    color: 'all',
    feature: 'all'
  });
  const [showFilters, setShowFilters] = useState(true);

  const filteredTemplates = templates.filter(t => {
    if (filters.orientation !== 'all' && t.orientation !== filters.orientation) return false;
    if (filters.color !== 'all' && t.color !== filters.color) return false;
    if (filters.feature !== 'all' && !t.features.includes(filters.feature)) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-500/30">
      {/* Light Tech Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-blue-50"></div>
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-100/40 blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-50/60 blur-[120px]"></div>
      </div>

      <Navbar />

      <div className="relative z-10 container mx-auto px-6 pt-28 pb-20">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-8 font-medium">
          <Link to="/" className="hover:text-blue-600 transition-colors flex items-center gap-1"><Home className="w-3 h-3" /> Home</Link>
          <ChevronRight className="w-3 h-3 opacity-50" />
          <Link to="/templates" className="hover:text-blue-600 transition-colors">Templates</Link>
          <ChevronRight className="w-3 h-3 opacity-50" />
          <span className="text-blue-600 capitalize">{category?.replace('-', ' ')}</span>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold capitalize text-slate-900 mb-2">
              {category?.replace('-', ' ')} Templates
            </h1>
            <p className="text-slate-600">Browse and customize professional templates for your organization.</p>
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search templates..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 shadow-sm outline-none transition-all focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900 placeholder:text-slate-400"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                "p-2.5 rounded-xl border transition-all hover:bg-slate-50 flex items-center gap-2 px-4 shadow-sm",
                showFilters ? "bg-blue-50 text-blue-700 border-blue-200" : "bg-white text-slate-600 border-slate-200"
              )}
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span className="hidden sm:inline font-medium">Filters</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Light Sidebar Filters border-slate-200 */}
          <motion.aside
            initial={false}
            animate={{
              width: showFilters ? 'auto' : '0px',
              opacity: showFilters ? 1 : 0,
              display: showFilters ? 'block' : 'none'
            }}
            className="lg:w-72 flex-shrink-0"
          >
            <div className="p-6 rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-xl shadow-sm sticky top-24">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-blue-600" /> Filters
                </h3>
                <button onClick={() => setShowFilters(false)} className="lg:hidden text-slate-400 hover:text-slate-900">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Orientation Filter */}
              <div className="mb-8">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4 block">Orientation</label>
                <div className="flex bg-slate-100 p-1 rounded-lg">
                  {['all', 'vertical', 'horizontal'].map(opt => (
                    <button
                      key={opt}
                      onClick={() => setFilters({ ...filters, orientation: opt })}
                      className={cn(
                        "flex-1 py-2 text-xs font-medium rounded-md capitalize transition-all",
                        filters.orientation === opt
                          ? "bg-white text-slate-900 shadow-sm border border-slate-200"
                          : "text-slate-500 hover:text-slate-900"
                      )}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Filter */}
              <div className="mb-8">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4 block">Color Theme</label>
                <div className="grid grid-cols-4 gap-3">
                  {['all', 'blue', 'red', 'green', 'dark'].map(color => (
                    <button
                      key={color}
                      onClick={() => setFilters({ ...filters, color })}
                      className={cn(
                        "w-10 h-10 rounded-xl border-2 transition-all hover:scale-110 flex items-center justify-center shadow-sm",
                        filters.color === color ? "border-slate-900" : "border-slate-200 hover:border-slate-300",
                        color === 'all' ? "bg-white" :
                          color === 'blue' ? "bg-blue-500" :
                            color === 'red' ? "bg-red-500" :
                              color === 'green' ? "bg-emerald-500" : "bg-slate-900"
                      )}
                      title={color}
                    >
                      {filters.color === color && <Check className={cn("w-4 h-4", color === 'all' ? "text-slate-900" : "text-white")} />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Features Filter */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4 block">Features</label>
                <div className="space-y-3">
                  {['all', 'qr', 'barcode'].map(opt => (
                    <label key={opt} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors group">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center transition-colors shadow-sm",
                          opt === 'qr' ? "bg-blue-100 text-blue-600" :
                            opt === 'barcode' ? "bg-purple-100 text-purple-600" : "bg-white text-slate-600 border border-slate-200"
                        )}>
                          {opt === 'qr' ? <QrCode className="w-4 h-4" /> : opt === 'barcode' ? <CreditCard className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                        </div>
                        <span className="capitalize text-sm font-medium text-slate-700 group-hover:text-slate-900">
                          {opt === 'qr' ? 'QR Code' : opt === 'all' ? 'All Features' : opt}
                        </span>
                      </div>
                      <div className={cn(
                        "w-5 h-5 rounded-full border flex items-center justify-center transition-all bg-white",
                        filters.feature === opt
                          ? "bg-blue-600 border-blue-600"
                          : "border-slate-300 group-hover:border-slate-400"
                      )}>
                        {filters.feature === opt && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <input
                        type="radio"
                        name="feature"
                        className="hidden"
                        checked={filters.feature === opt}
                        onChange={() => setFilters({ ...filters, feature: opt })}
                      />
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </motion.aside>

          {/* Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemplates.map((template, index) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative"
                >
                  <div className={cn(
                    "relative rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-2 hover:border-blue-300",
                    template.orientation === 'horizontal' ? "aspect-[1.586/1]" : "aspect-[1/1.586]"
                  )}>
                    {/* Image */}
                    <img
                      src={template.image}
                      alt={template.name}
                      className="w-full h-full object-cover transition-opacity duration-500"
                      referrerPolicy="no-referrer"
                    />

                    {/* Gradient Overlay for light theme */}
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

                    {/* Floating Elements */}
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="px-2 py-1 bg-white/90 backdrop-blur-md text-slate-800 text-[10px] uppercase font-bold rounded-md shadow-sm border border-slate-100">
                        {template.tags}
                      </span>
                    </div>

                    {/* Hover Actions */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/80 backdrop-blur-sm">
                      {(!user || user.role === 'company-admin' || user.role === 'company-user' || user.role === 'super-admin') ? (
                        <button className="px-6 py-3 bg-blue-600 text-white rounded-full font-bold text-sm shadow-lg shadow-blue-500/30 hover:bg-blue-700 hover:scale-105 transition-all flex items-center gap-2">
                          <Download className="w-4 h-4" /> Download Template
                        </button>
                      ) : (
                        <button disabled className="px-6 py-3 bg-slate-100 text-slate-400 rounded-full font-bold text-sm shadow-inner cursor-not-allowed flex items-center gap-2 border border-slate-200">
                          <Eye className="w-4 h-4" /> Preview Only
                        </button>
                      )}
                    </div>

                    {/* Bottom Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 z-10">
                      <h3 className="font-bold text-white text-lg mb-1 truncate drop-shadow-md">{template.name}</h3>
                      <div className="flex items-center gap-3 text-xs text-white/90 drop-shadow-md">
                        <div className="flex items-center gap-1">
                          <div className={cn("w-2 h-2 rounded-full shadow-sm",
                            template.color === 'blue' ? 'bg-blue-400' :
                              template.color === 'red' ? 'bg-red-400' :
                                template.color === 'green' ? 'bg-emerald-400' : 'bg-slate-400'
                          )} />
                          <span className="capitalize">{template.color}</span>
                        </div>
                        {template.features.includes('qr') && (
                          <div className="flex items-center gap-1">
                            <QrCode className="w-3 h-3" /> QR
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredTemplates.length === 0 && (
              <div className="text-center py-20 border border-dashed border-slate-300 rounded-3xl bg-slate-50">
                <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">No templates found</h3>
                <p className="text-slate-500 mb-6">Try adjusting your filters to see more results.</p>
                <button
                  onClick={() => setFilters({ orientation: 'all', color: 'all', feature: 'all' })}
                  className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
