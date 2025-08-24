"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { PlusCircle, XCircle } from 'lucide-react';

export default function SoftwareTab({
  allCompanySoftware,
  softwarePackages,
  selectedPackage,
  setSelectedPackage,
  handleAddSoftwareToPackage,
  handleRemoveSoftwareFromPackage,
  handleToggleRequired
}) {
  const currentPackageSoftwareIds = softwarePackages[selectedPackage].map(s => s.id);
  const availableSoftware = allCompanySoftware.filter(s => !currentPackageSoftwareIds.includes(s.id));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Software Packages by Role</CardTitle>
        <CardDescription>Manage and edit software bundles for specific job roles.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <Label htmlFor="package-select">Select a Role Package to Edit</Label>
          <Select value={selectedPackage} onValueChange={setSelectedPackage}>
            <SelectTrigger id="package-select" className="w-full md:w-1/3 mt-2">
              <SelectValue placeholder="Select a package" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(softwarePackages).map(pkgName => (
                <SelectItem key={pkgName} value={pkgName}>{pkgName}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Column 1: Software in the current package */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Software in "{selectedPackage}" Package</h3>
            <div className="border rounded-lg p-4 space-y-3 max-h-96 overflow-y-auto">
              {softwarePackages[selectedPackage].length > 0 ? (
                softwarePackages[selectedPackage].map(pkgSoftware => {
                  const softwareDetails = allCompanySoftware.find(s => s.id === pkgSoftware.id);
                  return (
                    <div key={softwareDetails.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                      <div>
                        <p className="font-medium">{softwareDetails.name}</p>
                        <p className="text-sm text-gray-500">{softwareDetails.category}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Switch
                            id={`required-${softwareDetails.id}`}
                            checked={pkgSoftware.required}
                            onCheckedChange={() => handleToggleRequired(softwareDetails.id)}
                          />
                          <Label htmlFor={`required-${softwareDetails.id}`} className="text-sm">Required</Label>
                        </div>
                        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700" onClick={() => handleRemoveSoftwareFromPackage(softwareDetails.id)}>
                          <XCircle className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-center text-gray-500 py-4">No software in this package. Add from the list on the right.</p>
              )}
            </div>
          </div>

          {/* Column 2: Available software to add */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Available Company Software</h3>
            <div className="border rounded-lg p-4 space-y-3 max-h-96 overflow-y-auto">
              {availableSoftware.length > 0 ? (
                availableSoftware.map(software => (
                  <div key={software.id} className="flex items-center justify-between p-3 border rounded-md">
                    <div>
                      <p className="font-medium">{software.name}</p>
                      <p className="text-sm text-gray-500">{software.category}</p>
                    </div>
                    <Button variant="outline" size="icon" className="text-green-600 border-green-600 hover:bg-green-50 hover:text-green-700" onClick={() => handleAddSoftwareToPackage(software.id)}>
                      <PlusCircle className="h-5 w-5" />
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-4">All available software is in the package.</p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}