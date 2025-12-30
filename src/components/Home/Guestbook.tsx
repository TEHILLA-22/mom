"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";


export default function Guestbook({ isOpen, onClose, userName }: any) {
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isAdmin, setIsAdmin] = useState(false); 
  const [replyingTo, setReplyingTo] = useState<any>(null);

  useEffect(() => {
    fetchComments();
    const channel = supabase
      .channel("live-comments")
      .on("postgres_changes", { event: "*", schema: "public", table: "comments" }, 
        () => fetchComments()
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const fetchComments = async () => {
    const { data } = await supabase.from("comments").select("*").order("created_at", { ascending: false });
    if (data) setComments(data);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    if (replyingTo) {
      // Logic for Mom's Reply
      await supabase.from("comments").insert([{ 
        name: "The Queen (Mom) 👑", 
        content: newComment, 
        is_admin: true 
      }]);
      setReplyingTo(null);
    } else {
      // Logic for Guest Comment
      await supabase.from("comments").insert([{ name: userName, content: newComment }]);
    }
    setNewComment("");
  };

  const deleteComment = async (id: string) => {
    await supabase.from("comments").delete().eq("id", id);
  };

  const enableAdmin = () => {
    const password = prompt("Enter Admin Key:");
    if (password === "momma2024") {
      setIsAdmin(true);
      alert("Admin Mode Active");
    } else {
      alert("Access Denied");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-end justify-center p-4 bg-black/60 backdrop-blur-md"
        >
          <motion.div 
            initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
            className="w-full max-w-lg bg-zinc-900 border border-white/10 rounded-t-[2rem] h-[80vh] flex flex-col overflow-hidden"
          >
            {/* CLEANED UP SINGLE HEADER */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
              <h3 
                onDoubleClick={enableAdmin} 
                className="text-gold-400 font-serif cursor-pointer select-none text-xl italic"
              >
                Well Wishes {isAdmin && "👑"}
              </h3>
              <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">Close</button>
            </div>

            {/* Comments List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
              {comments.map((msg) => (
                <motion.div 
                  layout key={msg.id}
                  className={`flex flex-col ${msg.is_admin ? "items-end" : "items-start"}`}
                >
                  <div className={`max-w-[85%] p-4 rounded-2xl shadow-xl ${
                    msg.is_admin 
                    ? "bg-gold-500/20 border border-gold-500/40" 
                    : "bg-white/5 border border-white/10"
                  }`}>
                    <p className="text-[10px] uppercase tracking-widest text-gold-500 mb-1 font-bold">
                      {msg.name}
                    </p>
                    <p className="text-sm text-white/90 leading-relaxed">{msg.content}</p>
                    
                    {/* Admin Actions: Only show if Admin mode is enabled */}
                    <div className="flex gap-4 mt-2">
                      {isAdmin && (
                        <button onClick={() => deleteComment(msg.id)} className="text-[10px] text-red-500/70 hover:text-red-500 underline">Delete</button>
                      )}
                      {!msg.is_admin && isAdmin && (
                        <button onClick={() => setReplyingTo(msg)} className="text-[10px] text-gold-400/70 hover:text-gold-400 underline">Reply</button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-6 bg-black/40 border-t border-white/10">
              {replyingTo && (
                <div className="flex justify-between text-[10px] text-gold-500 mb-2 px-2 italic">
                  <span>Replying to {replyingTo.name}...</span>
                  <button onClick={() => setReplyingTo(null)} className="underline">Cancel</button>
                </div>
              )}
              <div className="flex gap-2">
                <input 
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder={replyingTo ? "Write your reply..." : "Write a wish..."}
                  className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-3 text-sm focus:outline-none focus:border-gold-500 text-white transition-all"
                />
                <motion.button 
                  whileTap={{ scale: 0.9 }}
                  type="submit" 
                  className="bg-gold-500 text-black w-12 h-12 rounded-full flex items-center justify-center font-bold shadow-lg"
                >
                  →
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}