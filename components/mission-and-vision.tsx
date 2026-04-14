import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Target, Eye } from "lucide-react"
import { SOCIETY_DATA } from "@/data"

export function MissionVision() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
      {/* Misión */}
      <Card className="relative border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white pt-6">
        {/* Línea superior dorada */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#be8a34] rounded-t-xl" />

        <CardHeader className="pb-2">
          <div className="mb-4">
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-600 shadow-sm border border-red-100">
              <Target size={24} strokeWidth={2.5} />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-[#030a50]">
            Misión
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-600 leading-relaxed pb-8">
          {SOCIETY_DATA.mission}
        </CardContent>
      </Card>

      {/* Visión */}
      <Card className="relative border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white pt-6">
        {/* Línea superior dorada */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#be8a34] rounded-t-xl" />

        <CardHeader className="pb-2">
          <div className="mb-4">
            <div className="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center text-[#be8a34] shadow-sm border border-yellow-100">
              <Eye size={24} strokeWidth={2.5} />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-[#030a50]">
            Visión
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-600 leading-relaxed pb-8">
          {SOCIETY_DATA.vision}
        </CardContent>
      </Card>
    </div>
  )
}
