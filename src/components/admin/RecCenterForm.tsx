
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { RecCenter } from "@/types/database";

interface RecCenterFormProps {
  center: RecCenter;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  amenitiesInput: string;
  onAmenitiesChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RecCenterForm = ({
  center,
  onInputChange,
  amenitiesInput,
  onAmenitiesChange
}: RecCenterFormProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="text-sm font-medium" htmlFor="name">
          Name
        </label>
        <Input
          id="name"
          name="name"
          value={center.name}
          onChange={onInputChange}
          className="mt-1"
          required
        />
      </div>
      
      <div>
        <label className="text-sm font-medium" htmlFor="image_url">
          Image URL
        </label>
        <Input
          id="image_url"
          name="image_url"
          value={center.image_url}
          onChange={onInputChange}
          className="mt-1"
        />
      </div>
      
      <div className="md:col-span-2">
        <label className="text-sm font-medium" htmlFor="description">
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          value={center.description}
          onChange={onInputChange}
          className="mt-1"
          rows={3}
        />
      </div>
      
      <div className="md:col-span-2">
        <label className="text-sm font-medium" htmlFor="address">
          Address
        </label>
        <Input
          id="address"
          name="address"
          value={center.address}
          onChange={onInputChange}
          className="mt-1"
        />
      </div>
      
      <div>
        <label className="text-sm font-medium" htmlFor="city">
          City
        </label>
        <Input
          id="city"
          name="city"
          value={center.city}
          onChange={onInputChange}
          className="mt-1"
        />
      </div>
      
      <div>
        <label className="text-sm font-medium" htmlFor="state">
          State
        </label>
        <Input
          id="state"
          name="state"
          value={center.state}
          onChange={onInputChange}
          className="mt-1"
        />
      </div>
      
      <div>
        <label className="text-sm font-medium" htmlFor="postal_code">
          Postal Code
        </label>
        <Input
          id="postal_code"
          name="postal_code"
          value={center.postal_code}
          onChange={onInputChange}
          className="mt-1"
        />
      </div>
      
      <div>
        <label className="text-sm font-medium" htmlFor="phone">
          Phone
        </label>
        <Input
          id="phone"
          name="phone"
          value={center.phone}
          onChange={onInputChange}
          className="mt-1"
        />
      </div>
      
      <div>
        <label className="text-sm font-medium" htmlFor="email">
          Email
        </label>
        <Input
          id="email"
          name="email"
          value={center.email}
          onChange={onInputChange}
          className="mt-1"
          type="email"
        />
      </div>
      
      <div>
        <label className="text-sm font-medium" htmlFor="website">
          Website
        </label>
        <Input
          id="website"
          name="website"
          value={center.website}
          onChange={onInputChange}
          className="mt-1"
          type="url"
        />
      </div>
      
      <div className="md:col-span-2">
        <label className="text-sm font-medium" htmlFor="amenities">
          Amenities (comma separated)
        </label>
        <Input
          id="amenities"
          name="amenities"
          value={amenitiesInput}
          onChange={onAmenitiesChange}
          className="mt-1"
          placeholder="Pool, Basketball Court, Fitness Center"
        />
      </div>
    </div>
  );
};

export default RecCenterForm;
