import { supabase } from './src/lib/supabase';

const staffMembers = [
  {
    name: 'Victor Kiamba',
    position: 'Founder and Managing Partner',
    featured: true,
    order_priority: 10,
  },
  {
    name: 'Collins Mumo',
    position: 'Legal Intern',
    featured: false,
    order_priority: 40,
  },
  {
    name: 'Rahab Gikuhi',
    position: 'Consultant, Real Estate',
    featured: false,
    order_priority: 30,
  },
  {
    name: 'Jaleen Wanjiru',
    position: 'Associate Partner',
    featured: false,
    order_priority: 20,
  },
  {
    name: 'Felix Lemayian',
    position: 'Admin',
    featured: false,
    order_priority: 50,
  },
];

async function seedStaff() {
  try {
    const { data, error } = await supabase
      .from('staff')
      .insert(staffMembers);

    if (error) {
      console.error('Error inserting staff:', error);
    } else {
      console.log('Staff members added successfully:', data);
    }
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

seedStaff();
