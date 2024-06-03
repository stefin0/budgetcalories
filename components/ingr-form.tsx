export default function IngrForm() {
  return (
    <div className="grid gap-1 py-4">
      <div>
        <div>
          <Label>Name</Label>
          <Input />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Quantity</Label>
          <Input inputMode="numeric" />
        </div>
        <div>
          <Label>Unit</Label>
          <Select>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Metric</SelectLabel>
                <SelectItem value="g">g</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Imperial</SelectLabel>
                <SelectItem value="oz">oz</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label>Fat</Label>
          <Input inputMode="numeric" />
        </div>
        <div>
          <Label>Carb</Label>
          <Input inputMode="numeric" />
        </div>
        <div>
          <Label>Protein</Label>
          <Input inputMode="numeric" />
        </div>
      </div>
    </div>
  );
}
