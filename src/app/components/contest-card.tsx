import { ContestState } from '@/constants/constants'
import { ContestRow } from '@/types/entities'
import { Calendar, Clock, Trophy, Users, ChevronRight } from 'lucide-react'

export type ContentCardType = Omit<
  ContestRow,
  'created_at' | 'label' | 'name_repository' | 'updated_at' | 'user_id'
>

export const ContestCard = ({ contest }: { contest: ContentCardType }) => {
  return (
    <div className="bg-[#111111] border border-gray-800 rounded-lg overflow-hidden hover:border-purple-500/30 transition-all duration-300 group">
      <div
        className={`h-1 w-full ${
          contest.state === ContestState.ACTIVE
            ? 'bg-green-900/50 text-green-300 border border-green-700/50'
            : contest.state === ContestState.UPCOMING
              ? 'bg-blue-900/50 text-blue-300 border border-blue-700/50'
              : 'bg-red-900/50 text-red-300 border border-red-700/50'
        }`}
      ></div>
      {contest.image_url && (
        <div>
          <img src={contest.image_url} alt="" />
        </div>
      )}
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 transition-all duration-300">
            {contest.name}
          </h3>

          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ml-4 ${
              contest.state === ContestState.ACTIVE
                ? 'bg-green-900/50 text-green-300 border border-green-700/50'
                : contest.state === ContestState.UPCOMING
                  ? 'bg-blue-900/50 text-blue-300 border border-blue-700/50'
                  : 'bg-red-900/50 text-red-300 border border-red-700/50'
            }`}
          >
            {contest.state}
          </span>
        </div>
        <p className="text-gray-400 mb-6 text-sm">{contest.description}</p>
        <div className="grid grid-cols-1 gap-3 mb-6">
          {/* <div className="flex items-center text-sm text-gray-400">
            <Trophy className="h-4 w-4 text-yellow-500 mr-2" />
            {contest.prize}
          </div> */}
          <div className="flex items-center text-sm text-gray-400">
            <Clock className="h-4 w-4 text-blue-500 mr-2" />
            {contest.start}
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <Calendar className="h-4 w-4 text-red-500 mr-2" />
            {contest.ended}
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <Users className="h-4 w-4 text-green-500 mr-2" />
            {contest.participants} participantes
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900/50 text-green-300 border border-green-700/50`}
          >
            @{contest.owner}
          </span>
          <a
            href="#"
            className="text-purple-400 hover:text-purple-300 text-sm font-medium inline-flex items-center"
          >
            Ver Detalles
            <ChevronRight className="ml-1 h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  )
}
