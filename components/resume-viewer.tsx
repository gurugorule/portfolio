import React from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ResumeViewerProps {
  onClose: () => void
}

const ResumeViewer: React.FC<ResumeViewerProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-background rounded-lg shadow-lg w-full max-w-3xl h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Resume</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
        <div className="flex-grow p-4 overflow-auto">
          <iframe
            src="/assets/resume.pdf"
            className="w-full h-full"
            title="Resume PDF"
          />
        </div>
        <div className="p-4 border-t flex justify-end">
          <Button asChild>
            <a href="/assets/resume.pdf" download="Gurunath_Gorule_Resume.pdf">
              Download PDF
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ResumeViewer

