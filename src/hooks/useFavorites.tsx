import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export const useFavorites = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFavorites() {
      if (!user) {
        setFavorites([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('favorites')
          .select('rec_center_id')
          .eq('user_id', user.id);

        if (error) {
          console.error('Error loading favorites:', error);
          toast.error('Failed to load favorites');
        } else {
          setFavorites(data.map(fav => fav.rec_center_id));
        }
      } catch (error) {
        console.error('Error in loadFavorites:', error);
      } finally {
        setLoading(false);
      }
    }

    loadFavorites();
  }, [user]);

  const isFavorite = (centerId: string) => {
    return favorites.includes(centerId);
  };

  const toggleFavorite = async (centerId: string) => {
    if (!user) {
      toast.error('Please sign in to save favorites');
      return;
    }

    try {
      // If already a favorite, remove it
      if (isFavorite(centerId)) {
        const { error } = await supabase
          .from('favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('rec_center_id', centerId);

        if (error) {
          console.error('Error removing favorite:', error);
          toast.error('Failed to remove from favorites');
          return;
        }

        setFavorites(favorites.filter(id => id !== centerId));
        toast.success('Removed from favorites');
      } 
      // Otherwise add it as a favorite
      else {
        const { error } = await supabase
          .from('favorites')
          .insert({
            user_id: user.id,
            rec_center_id: centerId
          });

        if (error) {
          console.error('Error adding favorite:', error);
          toast.error('Failed to add to favorites');
          return;
        }

        setFavorites([...favorites, centerId]);
        toast.success('Added to favorites');
      }
    } catch (error) {
      console.error('Error in toggleFavorite:', error);
      toast.error('An error occurred');
    }
  };

  return {
    favorites,
    loading,
    isFavorite,
    toggleFavorite
  };
};
